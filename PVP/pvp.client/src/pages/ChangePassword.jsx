import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Sidebar from "../components/Sidebar";
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; // Grid version 1
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const drawerWidth = 240;

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
        <Box sx={{ display: 'flex', height: '120vh' }}>
            <CssBaseline />
            <Sidebar />
            <Box
                component="main"
            >
                <Toolbar />
                <Typography variant="h1">Change password</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="password"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="New password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="newPassword"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Repeat new password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="repeatNewPassword"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleEdit}>
                            Edit
                        </Button>
                    </Grid>
                    {errorText && (
                        <Grid item xs={12}>
                            <Typography variant="body2" color="error">{errorText}</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
            {/* Success Dialog */}
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