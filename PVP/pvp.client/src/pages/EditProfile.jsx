import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const drawerWidth = 240;

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
    });
    const [errorText, setErrorText] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:7200/api/Auth/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
                const fetchedData = {
                    name: content.name,
                    lastName: content.lastname,
                };
                setFormData(fetchedData);
            }
        )();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = async () => {
        setErrorText('');
        setSuccessDialogOpen(false); // Close success dialog if open

        try {
            const response = await fetch('https://localhost:7200/api/Auth/edituser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Show success dialog
                setSuccessDialogOpen(true);
            } else if (response.status === 400) {
                // Handle 400 Bad Request
                setErrorText('Failed to update profile. Please check your input.');
            } else {
                // Handle other errors
                console.error('Failed to update profile.');
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
                <Typography variant="h1">Edit profile</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={handleEdit}>
                            Edit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" component={Link} to="/changepassword">
                            Change password
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
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Profile updated successfully.</Typography>
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