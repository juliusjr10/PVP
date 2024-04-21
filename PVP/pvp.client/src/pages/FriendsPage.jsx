import * as React from 'react';
import Box from '@mui/material/Box';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import FriendsList from '../components/FriendList';
import FriendsRequestList from '../components/Friend requests/FriendRequestList';
export default function Friends() {
    return (
        <Box component="main" sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <CssBaseline />    
            <Sidebar />
                <FriendsList />
                <FriendsRequestList />
        </Box>
    );
}