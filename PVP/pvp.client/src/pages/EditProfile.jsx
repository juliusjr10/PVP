import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Sidebar from "../components/Sidebar";
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; // Grid version 1
import Button from '@mui/material/Button';

const drawerWidth = 240;

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
    });

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
        // Perform edit action here, such as making a request to update user profile
        // Example:
        console.log(JSON.stringify(formData));
        try {
            const response = await fetch('https://localhost:7200/api/Auth/edituser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle successful edit
                console.log('Profile updated successfully.');
            } else {
                // Handle failed edit
                console.error('Failed to update profile.');
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
                        {/* Use Link to navigate to ChangePasswordPage */}
                        <Button variant="contained" color="secondary" component={Link} to="/changepassword">
                            Change password
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}