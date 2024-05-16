import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Sidebar from "../components/Sidebar";
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    overflow: 'auto',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const Header = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        repeatNewPassword: '',
    });
    const [errorText, setErrorText] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = async () => {
        setErrorText(''); // Reset error text before making the request

        try {
            const response = await fetch('https://localhost:7200/api/Auth/changepassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Show success dialog
                setSuccessDialogOpen(true);
                // Refresh page after a delay
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else if (response.status === 400) {
                // Handle 400 Bad Request
                setErrorText('Invalid data. Please check your input.');
            } else {
                // Handle other errors
                console.error('Failed to change password.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <MainContent component="main">
                <Toolbar />
                <FormContainer elevation={3}>
                    <Header variant="h4">Change Password</Header>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Current Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="password"
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="New Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="newPassword"
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Repeat New Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="repeatNewPassword"
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleEdit}
                                sx={{ marginTop: 2 }}
                            >
                                Change Password
                            </Button>
                        </Grid>
                        {errorText && (
                            <Grid item xs={12}>
                                <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                                    {errorText}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </FormContainer>
            </MainContent>
            <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
                <DialogTitle>Password Changed</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Your password has been changed successfully.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
