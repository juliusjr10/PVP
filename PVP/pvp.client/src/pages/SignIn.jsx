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
import NavBar from '../components/LandingPage/LadingPageNavbar';
import Footer from '../components/LandingPage/Footer';
import { useNavigate } from 'react-router-dom';

const signInUpPages = [
    { label: 'Sign in', link: '/login' },
    { label: 'Sign up', link: '/signup' },
];

function SignIn() {
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

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
        // Redirect to /habitspage after sign-in
        navigate('/habitspage', { replace: true });
        // Set isAuthenticated to true in the App component
        window.dispatchEvent(new Event('login')); // Dispatch a custom event to trigger re-rendering of the App component
    }

    return (
        <Box>
            <NavBar pages={signInUpPages} />
            <Container disableGutters maxWidth={false} sx={{ position: 'relative', overflow: 'hidden' }}>
                <Box sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        lg: 'flex',
                        md: 'flex',
                        xl: 'flex'
                    }
                }}>
                    <Box className="circlebluelog"></Box>
                    <Box className="circleblue2log"></Box>
                    <Box className="circleblue3log"></Box>
                    <Box className="circleblue4log"></Box>
                    <Box className="circleblue5log"></Box>
                </Box>

                <Container component="main" maxWidth="xs" sx={{ pt: 10, pb: 8 }}>
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
            <Footer />
        </Box>
    );
}

export default SignIn;