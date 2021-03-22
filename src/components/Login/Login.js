import { IconButton, InputAdornment } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from 'firebase';
import React, { useContext, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { UserContext } from '../../App';
import firebaseConfig from './firebaseConfig';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const { setUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({});

  const [newUser, setNewUser] = useState(true);

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const uiConfig = {
    signInFlow: 'popup',

    signInSuccessUrl: '/signedIn',

    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],

    callbacks: {
      signInSuccessWithAuthResult: (authResult) => handleResponse(authResult)
    }
  }

  const handleChange = (prop) => (event) => {
    setUserInput({ ...userInput, [prop]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = userInput;

    if (newUser && name && email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          updateUserName(name);
          handleResponse(res);
        })
        .catch(error => console.log(error))
    }

    if (!newUser && email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => handleResponse(res))
        .catch(error => console.log(error));
    }
  }

  const updateUserName = name => {
    firebase
      .auth()
      .currentUser
      .updateProfile({
        displayName: name
      })
      .then(() => console.log('user name updated successfully'))
      .catch(error => console.log(error.message))
  }

  const handleResponse = (res) => {
    const { displayName, photoURL, email } = res.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName || userInput.name,
      email: email,
      photo: photoURL
    }
    setUser(signedInUser);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {newUser ? "Sign up" : "Sign in"}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          {newUser &&
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              name="name"
              type="text"
              autoComplete="name"
              onChange={handleChange('name')}
              autoFocus
            />}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            onChange={handleChange('email')}
            autoComplete="email"
            autoFocus
            helperText={error && error.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            onChange={handleChange('password')}
            autoComplete="current-password"
            helperText={error && error.message}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {newUser ? "Sign up" : "Sign in"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {!newUser && "Forgot password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" onClick={() => setNewUser(!newUser)} variant="body2">
                {newUser ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={3}>
        <Typography align="center" component="h6" variant="h6" style={{
          borderBottom: "1px solid #3f51b5",
          lineHeight: "0.1em",
          margin: "10px 0 20px"
        }}>
          <span style={{
            background: "#fafafa",
            padding: "0 10px"
          }}>Or</span>
        </Typography>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;