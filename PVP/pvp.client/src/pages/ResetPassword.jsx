import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState } from 'react';

// Import your logo image
import Logo from "../assets/logo-no-background.svg"; // Update the path to your logo file

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                HabitBook
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function ResetPassword() {
    const [resetMessage, setResetMessage] = useState(null);
    const [emailWritten, setEmailWritten] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget; // Store a reference to the form element
        const data = new FormData(form);
        const email = data.get('email');
        const url = `https://localhost:7200/api/forgotpassword?email=${encodeURIComponent(email)}`;

        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            // No need to stringify here since we are using query parameters
        });

        // Reset the form fields after submission
        form.reset();

        // Show reset message
        setResetMessage('Password reset link sent. Please check your email.');
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setEmailWritten(!!email.trim()); // Set emailWritten to true if email is not empty
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontFamily: 'Roboto, sans-serif', // Apply Roboto font family
                    }}
                >
                    {/* Logo */}
                    <img src={Logo} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                        Reset Password
                    </Typography>
                    {emailWritten && resetMessage && (
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                            {resetMessage}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleEmailChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset password
                        </Button>
                    </Box>
                    <Box mt={2} mb={4} textAlign="center">
                        <Link href="/login" variant="body2">
                            Remember your password? Sign in
                        </Link>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}