import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Backdrop } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as propTypes from 'prop-types';
import GameCard from './game-card/GameCard';
import BackButton from './back-button/BackButton';
import HelpButton from './help-button/HelpButton';
import Store from '../redux/store';
import WinScreen from './win-screen/WinScreen';
import ErrorCard from '../error/ErrorCard';

function MemoryGame({ animateHeaderFooter }) {
  const { cardSetId } = useParams();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [removedCards, setRemovedCards] = useState([]);
  const [notMatched, setNotMatched] = useState(false);
  const [matched, setMatched] = useState(false);
  const [turn, setTurn] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lockCards, setLockCards] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Store.getState().authToken) {
      navigate('/login');
    }
  });

  const emptySelected = () => {
    setSelectedCards([]);
  };

  const clickMemoryGameBody = () => {
    setTurn(turn + 1);
    if (notMatched) {
      setNotMatched(false);
    } else {
      const cardOne = cards[selectedCards[0]];
      const cardTwo = cards[selectedCards[1]];
      const newRemovedCards = [];
      for (let i = 0; i < cards.length; i += 1) {
        if (cards[i].id === cardOne.id || cards[i].id === cardTwo.id) {
          newRemovedCards.push(cards[i]);
        }
      }
      setMatched(false);
      setRemovedCards(newRemovedCards.concat(removedCards));
    }
    setSelectedCards([]);
  };

  const clickMemoryCard = (cardId) => {
    const newSelectedCards = [...selectedCards, cardId];

    if (newSelectedCards.length === 2) {
      const cardOne = cards[newSelectedCards[0]];
      const cardTwo = cards[newSelectedCards[1]];
      if (cardOne.cardPair.id !== cardTwo.cardPair.id) {
        setNotMatched(true);
      } else if (cardOne.cardPair.id === cardTwo.cardPair.id) {
        setMatched(true);
      }
    }
    setSelectedCards(newSelectedCards);
  };

  const canSelectAnotherCard = () => {
    return selectedCards.length < 2;
  };
  const handleInvalidAuth = () => {
    Store.dispatch({ type: 'SET_AUTH_TOKEN', payload: null });
    navigate('/login');
  };
  const lastCardAnimated = () => {
    setLockCards(false);
  };

  const fetchData = () => {
    return fetch('/webapp/api/selectCardSet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Store.getState().authToken,
      },
      body: `{"cardSetId": "${cardSetId}"}`,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setHasError(true);
        }
        return [];
      })
      .then((data) => {
        setCards(data.cards);
        setIsPlaying(true);
      });
  };

  useEffect(() => {
    fetchData();
    animateHeaderFooter(false);

    return () => {
      animateHeaderFooter(true);
    };
  }, []);

  let content;
  let showBackHelp = true;

  if (cards != null && cards.length > 0 && !hasError) {
    const cardList = cards.map(
      (card, index) => {
        const isCardTurned = selectedCards.includes(index);
        return (
          <GameCard
            content={card.mediaType}
            mediaSrc={card.mediaPath}
            cardId={index}
            key={index}
            cardClickActionHandler={(id) => clickMemoryCard(id)}
            cardSelectCheck={() => canSelectAnotherCard()}
            currentSelectedCards={selectedCards}
            isTurned={isCardTurned}
            removedCards={removedCards}
            cards={cards}
            emptySelected={() => emptySelected()}
            notMatched={notMatched}
            matched={matched}
            delay={index * 250}
            lockCards={lockCards}
            lastCardAnimated={lastCardAnimated}
            isLastCard={index + 1 === cards.length}
          />
        );
      },
    );
    content = (

      <Container>
        <Box sx={{ justifyContent: 'left', display: 'block', textAlign: 'left' }}>
          {cardList}
        </Box>
      </Container>
    );
  } else if (hasError) {
    content = (
      <ErrorCard
        errorText="Your Session is invalid, please login again"
        buttonText="Login"
        buttonAction={handleInvalidAuth}
      />
    );
  }
  if (!hasError && isPlaying && cards.length === removedCards.length) {
    content = (
      <WinScreen turn={turn} />
    );

    showBackHelp = false;
  }
  return (
    <Container
      spacing={1}
      sx={{
        backgroundColor: 'background.main',
      }}
      maxWidth="xl"
    >
      <Grid container spacing={1} sx={{ textAlign: 'center' }}>
        <Grid item sx={{ mb: '0.5rem', display: 'flex' }}>
          {showBackHelp && <BackButton />}
        </Grid>
        <Box>
          {
            selectedCards.length === 2
            && (
              <Typography
                variant="p"
                sx={{
                  color: 'white',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  paddingTop: '20px',
                }}
              >Click anywhere to continue
              </Typography>
            )
            }
        </Box>
        <Grid item flexGrow={1} sx={{ mb: '0.5rem', display: 'flex', justifyContent: 'right' }}>
          {showBackHelp && <HelpButton />}
        </Grid>
      </Grid>
      { content }
      <Backdrop
        sx={{ zIndex: 0, backgroundColor: 'transparent' }}
        open={selectedCards.length === 2}
        onClick={clickMemoryGameBody}
      />
    </Container>
  );
}

MemoryGame.propTypes = {
  animateHeaderFooter: propTypes.func.isRequired,
};

export default MemoryGame;
