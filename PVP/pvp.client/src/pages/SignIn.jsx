import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainPage from './MainPage';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import '../landingpage.css';


const signInUpPages = [
    { label: 'Sign in', link: '/login' },
    { label: 'Sign up', link: '/signup' },
];

function SignIn() {
    const [redirect, setRedirect] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        // Check if email and password are not empty
        if (!email || !password) {
            // Optionally display an error message or handle the empty fields scenario
            return;
        }

        try {
            const response = await fetch('https://localhost:7200/api/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    Email: email,
                    Password: password
                })
            });

            if (!response.ok) {
                // Throw an error to be caught below
                throw new Error('Bad request');
            }

            // If response is successful, set redirect state
            setRedirect(true);
        } catch (error) {
            // Handle errors here, for now, you can log the error
            console.error('Error:', error.message);
            // Optionally display an error message to the user
            alert('Error: Bad request');
        }
    }
    if (redirect) {
        // Optionally, redirect to another page or component instead of App
        return <MainPage/>
    }

    return (
        <ThemeProvider theme={createTheme()}>
            <AppAppBar pages={signInUpPages}></AppAppBar>
            <Container disableGutters maxWidth={false} sx={{ bgcolor: '#A8D0E6', position: 'relative', overflow: 'hidden', }}>
                <div className="circlebluelog"></div>
                <div className="circleblue2log"></div>
                <div className="circleblue3log"></div>
                <div className="circleblue4log"></div>
                <div className="circleblue5log"></div>
            <Container component="main" maxWidth="xs" sx={{ pt: 10, bgcolor: '#ceeaed', height: '88vh' }}>
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgotpassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="*" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                </Container>
            </Container>
            <Footer></Footer>
        </ThemeProvider>
    );
}

export default SignIn;