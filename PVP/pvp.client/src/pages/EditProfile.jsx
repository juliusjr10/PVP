import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Sidebar from "../components/Sidebar";
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; // Grid version 1

const drawerWidth = 240;
export default function EditProfile() {
    return (
        <Box>
            <CssBaseline />
            <Sidebar />
            <Box
                component="main"
                sx=
                {{
                    flexGrow: 1,
                    p: 3,
                    sm: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    width:'50%'
                }}
            >
                <Toolbar />
                <Typography variant="h1">Edit profile</Typography>
                <Grid>
                    <Grid xs={6}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            label="Confirm password"
                            type="confirmpassword"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
}