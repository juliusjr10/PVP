import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SignIn from "./SignIn"
import Footer from '../components/LandingPage/Footer';
import '../landingpage.css';
import NavBar from '../components/LandingPage/LadingPageNavbar';
import SignUpPhoto from "../assets/SignUpPhoto.svg";

const signInUpPages = [
    { label: 'Sign in', link: '/login' },
    { label: 'Sign up', link: '/signup' },
];

export default function SignUp() {
    const [redirect, setRedirect] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [error, setError] = useState(null);

    const handleSignInClick = () => {
        setRedirect(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await fetch('https://localhost:7200/api/Auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Name: data.get('firstName'),
                    Lastname: data.get('lastName'),
                    Username: data.get('username'),
                    Email: data.get('email'),
                    Password: data.get('password'),
                    DateOfBirth: selectedDate
                })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    setError('Bad register data. Please check your input. Password must be at least 6 characters long');
                } else {
                    throw new Error('Failed to register');
                }
            } else {
                setRedirect(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (redirect) {
        return <SignIn />;
    }

    return (
        <Box>
            <NavBar pages={signInUpPages}></NavBar>
            <Container disableGutters maxWidth={false} sx={{
                p: 0,
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Container component="main" maxWidth="50%" sx={{
                    pt: 12,

                }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            width:'400px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 6,
                            m: 'auto'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            {error && (
                                <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                                    {error}
                                </Typography>
                            )}
                            <Grid container spacing={2} >
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={selectedDate}
                                            onChange={(newValue) => setSelectedDate(newValue)}
                                        />
                                    </LocalizationProvider>
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
                                    <Link onClick={handleSignInClick} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>

                <Container>
                    <Box
                        sx={{
                        m: 'auto',
                        height: '100%',
                        display:'flex',
                            alignItems: 'center',
                    }}
                    >
                        <img src={SignUpPhoto} alt="Connect" />
                    </Box>
                        
                </Container>
            </Container>
            <Footer></Footer>
        </Box>
    );
}