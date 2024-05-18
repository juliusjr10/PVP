import * as React from 'react';
import Box from '@mui/material/Box';
import FriendsList from '../components/FriendList';
import FriendsRequestList from '../components/Friend requests/FriendRequestList';
export default function FriendsListPageComponent() {
    return (
            <Box sx={{
                width: '60%',
                marginBottom: '100px',
                marginTop: '50px'
            }}>
                <Box sx={{
                    margin: '0 auto',
                    rowGap: '20px',
                    columnGap: '1.33%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 400px)',
                    justifyContent: 'space-around',
                    marginBottom: '10px'
                }}>
                    <FriendsList />
                    <FriendsRequestList />
                </Box>
            </Box>
    );
}