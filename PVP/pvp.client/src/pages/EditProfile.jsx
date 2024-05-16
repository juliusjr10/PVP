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
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const MainContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    overflow: 'auto',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        maxWidth: 600,
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '90%',
    },
}));

const Header = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
    });
    const [errorText, setErrorText] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://localhost:7200/api/Auth/user', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const content = await response.json();
            setFormData({
                name: content.name,
                lastName: content.lastname,
            });
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = async () => {
        setErrorText('');
        setSuccessDialogOpen(false);

        try {
            const response = await fetch('https://localhost:7200/api/Auth/edituser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSuccessDialogOpen(true);
            } else if (response.status === 400) {
                setErrorText('Failed to update profile. Please check your input.');
            } else {
                console.error('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <MainContent component="main">
                <Toolbar />
                <FormContainer elevation={3}>
                    <Header variant={isSmallScreen ? "h5" : "h4"}>Edit Profile</Header>
                    <Grid container spacing={isSmallScreen ? 1 : 2}>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleEdit}
                                sx={{ marginTop: 2 }}
                            >
                                Save Changes
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                component={Link}
                                to="/changepassword"
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
