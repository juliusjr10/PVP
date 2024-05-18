import * as React from 'react';
import Box from '@mui/material/Box';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import FriendsListPageComponent from '../components/Friends';
export default function Friends() {
    return (
        <Box component="main" sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <Sidebar />
            <FriendsListPageComponent />
        </Box>
    );
}