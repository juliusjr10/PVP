import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');

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

    const handleAddFriend = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleAdd = async () => {
        try {
            const response = await fetch(`https://localhost:7200/api/Friends/createfriendrequest?username=${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('jwt')}`,
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to add friend');
            }
            console.log('Friend added successfully');
            setUsername('');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding friend:', error);
            // Handle error, such as displaying an error message to the user
        }
    };

    console.log('Friends:', userFriends); // Log the friends array

    return (
        <Box
            sx={{ width: '40%', height: '80%', bgcolor: 'background.paper', marginTop: '100px', marginLeft: '10px', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
            <Typography variant="h5" gutterBottom sx={{
                backgroundColor: '#5a00ec',
                color: 'white',
                fontWeight: '700',
                padding: '5px',
            }}>
                FRIENDS
            </Typography>
            <FixedSizeList
                height={450}
                width="100%"
                itemSize={46}
                itemCount={userFriends.length}
                overscanCount={5}
            >
                {({ index, style }) => renderRow(userFriends[index], index, style)}
            </FixedSizeList>
            <Button variant="contained" color="primary" onClick={handleAddFriend} sx={{ margin: '10px' }}>
                Add Friend
            </Button>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Friend
                    </Typography>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={handleUsernameChange}
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mt: 2 }}>
                        Add
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}