import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Sidebar from "../components/Sidebar";
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; // Grid version 1
import Button from '@mui/material/Button';

const drawerWidth = 240;

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        repeatNewPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = async () => {
        // Log formData as JSON
        console.log(JSON.stringify(formData));

        // Perform edit action here, such as making a request to update user profile
        // Example:
        try {
            const response = await fetch('https://localhost:7200/api/Auth/changepassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle successful edit
                console.log('Password changed successfully.');
            } else {
                // Handle failed edit
                console.error('Failed to change password.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                </Grid>
            </Box>
        </Box>
    );
}