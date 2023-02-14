import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import Store from '../redux/store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Store.getState()) {
      navigate('/menu');
    }
  });
  const [errorMessage, setErrorMessage] = React.useState(<p />);
  const [formValues, setFormValues] = React.useState({
    username: {
      value: '',
    },
    password: {
      value: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    const index = formFields.indexOf(name);
    const currentField = formFields[index];
    newFormValues = {
      ...newFormValues,
      [currentField]: {
        ...newFormValues[currentField],
        value,
      },
    };
    setFormValues(newFormValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.username.value !== '' && formValues.password.value !== '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries())),
      };
      fetch('/webapp/api/auth/login', requestOptions)
        .then((response) => response.text())
        .then((token) => {
          Store.dispatch({ type: 'ADD_TOKEN', payload: token });
          if (token.length !== 0) {
            navigate('/menu');
          } else {
            setErrorMessage(<Alert sx={{ width: '100%', marginTop: '1rem' }} severity="error">Username or password not correct!</Alert>);
          }
        })
        .catch((error) => {
          setErrorMessage(<Alert sx={{ width: '100%', marginTop: '1rem' }} severity="error">{error.message}</Alert>);
        });
    } else {
      setErrorMessage(<Alert sx={{ width: '100%', marginTop: '1rem' }} severity="error">Please fill out form correctly.</Alert>);
    }
  };

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <Container
      spacing={1}
      sx={{
        backgroundColor: 'background.main',
      }}
      maxWidth="xl"
    >
      <Grid
        container
        spacing={1}
        sx={{
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sm={5}>
          <Item className="items">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  marginBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="username"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={handleChange}
                      />

                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="text"
                        onClick={handleOnClick}
                        sx={{
                          textTransform: 'none',
                        }}
                      >
                        Don&apos;t have an account? Register now
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container>
                    {errorMessage}
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
