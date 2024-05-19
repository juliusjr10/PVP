import * as React from 'react';
import Box from '@mui/material/Box';
import FriendsList from '../components/FriendList';
import FriendsRequestList from '../components/Friend requests/FriendRequestList';
export default function FriendsListPageComponent() {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'start',
            gap: '2em',
        }}>
            <FriendsList />
            <FriendsRequestList />
        </Box>
    );
}