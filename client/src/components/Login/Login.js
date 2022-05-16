import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Login() {
  const userStorage = window.localStorage;
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const history = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };

    try {

      const res = await axios.post('/users/login', User)
      userStorage.setItem('user', res.data.username);
      setError(false);
      setIsLoggedIn(true);
      history('/dashboard')


    } catch (err) {
      setError(true);
      console.log(err)
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user){
        setIsLoggedIn(true)
    }
}, [setIsLoggedIn])

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'teal', }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              inputRef={usernameRef}
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              inputRef={passwordRef}
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'teal', ':hover': { bgcolor: '#80cbc4', color: 'white' }}}
            >
              Sign In
            </Button>
            </Box>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account?
                </Link>
              </Grid>
            </Grid>

        </Box>
      </Container>
  );
}