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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SignIn from "./SignIn"
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import '../landingpage.css';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'© HabitBook '}
            
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const signInUpPages = [
    { label: 'Sign in', link: '/login' },
    { label: 'Sign up', link: '/signup' },
];

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const [redirect, setRedirect] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
    const [error, setError] = useState(null); // State to hold error message

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
                    DateOfBirth: selectedDate // Include selected date in the request
                })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    setError('Bad register data. Please check your input. Password must be atleast 6 characters long');
                } else {
                    throw new Error('Failed to register');
                }
            } else {
                setRedirect(true);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    if (redirect) {
        return <SignIn />;
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <AppAppBar pages={signInUpPages}></AppAppBar>
            <Container disableGutters maxWidth={false} sx={{ bgcolor: '#A8D0E6', position: 'relative', overflow: 'hidden', }}>
                <div className="circlebluelog"></div>
                <div className="circleblue2log"></div>
                <div className="circleblue3log"></div>
                <div className="circleblue4log"></div>
                <div className="circleblue5log"></div>
                <Container component="main" maxWidth="xs" sx={{ pt: 12, bgcolor: '#ceeaed', height: '100vh' }}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 6,
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                                        onChange={(newValue) => setSelectedDate(newValue)} // Update selected date
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
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
                                <Link onClick={handleSignInClick} variant="body2">
                                    Already have an account? Sign in
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