import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import SignUp from './sign-up/Signup';
import Store from '../redux/store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Store.getState().authToken) {
      navigate('/menu');
    }
  });
  return (
    <Container
      spacing={1}
      sx={{
        backgroundColor: 'background.main',
      }}
      maxWidth="xl"
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <Item className="items">
              <SignUp />
            </Item>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Item className="items">
              <ReactPlayer
                url="https://wegener-clan.de/media/landing-page/videos/game-preview.mp4"
                playing="true"
                loop
                width="100%"
                height="100%"
                className="preview-player"
              />
            </Item>
          </Grid>
          <Grid item sm={12}>
            <Item
              sx={{
                textAlign: 'left',
              }}
              className="items"
            >
              <Box sx={{ pl: '2rem' }}>
                <h3>Play your favorite memory set</h3>
                {/* eslint-disable-next-line max-len */}
                <p>Find the right pairs of your beloved movie, series and game soundtracks with imagery from the franchise.</p>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default LandingPage;
