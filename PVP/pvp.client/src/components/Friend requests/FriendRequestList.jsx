import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
};

const handleAccept = async (Id) => {
    try {
        const response = await fetch(`https://localhost:7200/api/Friends/acceptrequest/${Id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}`,
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to accept friend request');
        }
        // Handle success response, such as updating UI
        window.location.reload(); // Refresh the page
    } catch (error) {
        console.error('Error accepting friend request:', error);
        // Handle error, such as displaying an error message
    }
};

const handleDecline = async (Id) => {
    try {
        const response = await fetch(`https://localhost:7200/api/Friends/declinerequest/${Id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}`,
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to decline friend request');
        }
        // Handle success response, such as updating UI
        window.location.reload(); // Refresh the page
    } catch (error) {
        console.error('Error declining friend request:', error);
        // Handle error, such as displaying an error message
    }
};

function renderRow(request, index, style) {
    if (!request.sender) {
        return null; // Return null if sender information is not available
    }

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar alt={request.sender.username} src={`../assets/react.svg`} sx={{ width: 32, height: 32 }} />
                </ListItemAvatar>
                <ListItemText primary={request.sender.username} />
                <Button onClick={() => handleAccept(request.id)}>Accept</Button>
                <Button onClick={() => handleDecline(request.id)}>Decline</Button>
            </ListItemButton>
        </ListItem>
    );
}

export default function FriendsRequestList() {
    const [userRequests, setUserRequests] = useState([]);
    const [detailsFetched, setDetailsFetched] = useState(false);

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const fetchUserRequests = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/Friends/requests/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('jwt')}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user friend requests');
                }
                const data = await response.json();
                if (data && Array.isArray(data.$values)) {
                    setUserRequests(data.$values);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching user friend requests:', error);
            }
        };

        fetchUserRequests();
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userIds = userRequests.map(request => request.senderId);
                const userDetailsPromises = userIds.map(async userId => {
                    const response = await fetch(`https://localhost:7200/api/Auth/user/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getCookie('jwt')}`,
                        },
                        credentials: 'include',
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to fetch user details for user ID ${userId}`);
                    }
                    return await response.json();
                });
                const userDetails = await Promise.all(userDetailsPromises);
                setUserRequests(prevRequests => {
                    return prevRequests.map((request, index) => {
                        return { ...request, sender: userDetails[index] };
                    });
                });
                setDetailsFetched(true); // Mark details as fetched
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (userRequests.length > 0 && !detailsFetched) {
            fetchUserDetails();
        }
    }, [userRequests, detailsFetched]);

    console.log('Requests:', userRequests); // Log the friend requests array

    let width;

    if (isSmallScreen) {
        width = '400px';
    } else {
        width = '700px';
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                marginTop: '100px',
                flexDirection: 'column',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '50px',
                width: width
            }}
        >
            <Typography variant="h5" gutterBottom sx={{
                backgroundColor: '#5a00ec',
                color: 'white',
                fontWeight: '700',
                padding: '5px',
            }}>
                FRIENDS REQUESTS
            </Typography>
            <Box sx={{
                display: 'flex',
            } }>
                <FixedSizeList
                    height={500}
                    width="100%"
                    itemSize={46}
                    itemCount={userRequests.length}
                    overscanCount={5}
                >
                    {({ index, style }) => renderRow(userRequests[index], index, style)}
                </FixedSizeList>
            </Box>

        </Box>
    );
}