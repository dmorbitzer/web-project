import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Store from '../../redux/store';

function SignUp() {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = React.useState({
    username: {
      value: '',
      error: false,
      errorMessage: 'You must enter a username',
    },
    email: {
      value: 21,
      error: false,
      errorMessage: 'You must enter an email',
    },
    password: {
      value: '',
      error: false,
      errorMessage: 'You must enter a password',
    },
  });

  const handleChange = (e) => {
    setErrorMessage(null);
    const { name, value } = e.target;
    const validRegex = /.+@.+\..+/;
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    const index = formFields.indexOf(name);
    const currentField = formFields[index];
    const currentTextContent = e.target.labels[0].textContent;
    const currentLabel = currentTextContent.substring(0, currentTextContent.length - 2);

    if (value === '') {
      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: true,
          errorMessage: `You must enter a ${currentLabel}`,
        },
      };
      setFormValues(newFormValues);
    } else if (value !== '') {
      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: false,
          errorMessage: '',
        },
      };
      setFormValues(newFormValues);
    }
    if (name === 'password' && value.length < 5 && value.length > 0) {
      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: true,
          errorMessage: 'Your Password is to short',
        },
      };
      setFormValues(newFormValues);
    }
    if (name === 'email' && !value.match(validRegex) && value.length > 0) {
      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: true,
          errorMessage: `No valid ${currentLabel}`,
        },
      };
      setFormValues(newFormValues);
    }
  };

  const handleCheckbox = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.username.errorMessage === '' && formValues.email.errorMessage === '' && formValues.password.errorMessage === '' && checkboxChecked === true) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries())),
      };
      fetch('/webapp/api/auth/register', requestOptions)
        .then((response) => {
          if (response.status === 200) {
            Store.dispatch({ type: 'SET_LOGIN_BANNER_INFO', payload: 'register' });
            navigate('/login');
          } else if (response.status === 409) {
            return response.text();
          } else {
            return 'We seem to have issues reaching our servers. Please try again later.';
          }
          return null;
        })
        .then((response) => {
          setErrorMessage(response);
        })
        .catch(() => {
          setErrorMessage('We seem to have issues reaching our servers. Please try again later.');
        });
    } else {
      setErrorMessage('Please fill out form correctly');
    }
  };

  const handleOnClick = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container sx={{ paddingBottom: '15px' }}>
            {
              errorMessage
              && <Alert sx={{ width: '100%', marginTop: '1rem' }} severity="error">{errorMessage}</Alert>
            }
          </Grid>
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
                helperText={formValues.username.error && formValues.username.errorMessage}
                error={formValues.username.error}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={formValues.email.error && formValues.email.errorMessage}
                error={formValues.email.error}
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
                helperText={formValues.password.error && formValues.password.errorMessage}
                error={formValues.password.error}
                onChange={handleChange}
              />

            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="confirmWait" color="primary" required />}
                label="I am aware that my registration needs to be confirmed by an administrator and hence will take up to 3 days."
                checked={checkboxChecked}
                onChange={handleCheckbox}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
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
                Already have an account? Log in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
