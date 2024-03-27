import { useState } from 'react';
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
import { useParams } from "react-router-dom";
import Logo from "../assets/logo-no-background.svg";
import MainPage from "./MainPage";

function ResetPassword() {
    const { token } = useParams();
    const [resetSuccessful, setResetSuccessful] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newPassword = data.get('newpassword');
        const confirmNewPassword = data.get('confirmnewpassword');

        // Check if passwords match
        if (newPassword !== confirmNewPassword) {
            console.error("New password and confirm password do not match");
            // Handle mismatch, e.g., show an error message to the user
            return;
        }

        const requestBody = {
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
            token: token
        };
        console.log('Request Body:', requestBody); // Log the request body
        try {
            const response = await fetch('https://localhost:7200/api/Auth/resetpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            // Check if response status is 200 (OK)
            if (response.status === 200) {
                // Set resetSuccessful to true after successful password reset
                setResetSuccessful(true);
            } else {
                console.error('Reset password failed with status:', response.status);
                // Handle other status codes, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <ThemeProvider theme={createTheme()}>
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
                    {/* If password reset is successful, show a success message */}
                    {resetSuccessful && (
                        <Typography variant="body1" color="primary" sx={{ textAlign: 'center', mt: 2 }}>
                            Password reset successful. Please proceed to <Link href="/login">login</Link>.
                        </Typography>
                    )}
                    {!resetSuccessful && (
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="newpassword"
                                label="New password"
                                name="newpassword"
                                autoComplete="newpassword"
                                autoFocus
                                type = "password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="confirmnewpassword"
                                label="Confirm new password"
                                name="confirmnewpassword"
                                autoComplete="confirmnewpassword"
                                autoFocus
                                type = "password"
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
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ResetPassword;