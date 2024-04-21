import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

function renderRow(friend, index, style) {
    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar alt={friend.username} src="../assets/react.svg" sx={{ width: 32, height: 32 }} />
                </ListItemAvatar>
                <ListItemText primary={friend.username} />
            </ListItemButton>
        </ListItem>
    );
}

export default function FriendsList() {
    const [userFriends, setUserFriends] = useState([]);

    useEffect(() => {
        const fetchUserHabits = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/Friends/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('jwt')}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user habits');
                }
                const data = await response.json();
                if (data && Array.isArray(data.$values)) {
                    setUserFriends(data.$values);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching user habits:', error);
            }
        };

        fetchUserHabits();
    }, []);

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };

    console.log('Friends:', userFriends); // Log the friends array

    return (
        <Box
            sx={{ width: '40%', height: '80%', bgcolor: 'background.paper', marginTop: '100px', marginLeft:'10px', display:'flex' }}
        >
            <FixedSizeList
                height={500}
                width="100%"
                itemSize={46}
                itemCount={userFriends.length}
                overscanCount={5}
            >
                {({ index, style }) => renderRow(userFriends[index], index, style)}
            </FixedSizeList>
        </Box>
    );
}