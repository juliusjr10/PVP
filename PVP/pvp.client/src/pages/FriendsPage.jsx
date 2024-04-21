import * as React from 'react';
import Box from '@mui/material/Box';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';

export default function Friends() {


    return (
        <Box component="main" sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
        </Box>
    );
}