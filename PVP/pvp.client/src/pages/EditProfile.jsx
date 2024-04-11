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

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        username: '',
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
                    username: content.username,
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
        try {
            const response = await fetch('https://localhost:7200/api/Auth/user', {
                method: 'PUT',
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
        <Box sx={{ bgcolor: "#A8D0E6", height: '100vh' }}>
            <CssBaseline />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    sm: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    width: '50%'
                }}
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
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="username"
                            value={formData.username}
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