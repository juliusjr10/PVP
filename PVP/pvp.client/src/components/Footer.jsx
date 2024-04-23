import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';


function Copyright() {
    return (
        <Typography variant="body2" mt={5}>
            {'© HabitBook '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                height: '100px',
                alignItems: 'center',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',

            }}>
                <Copyright sx={{}} ></Copyright>
            </AppBar>
        </Box>
    );
}