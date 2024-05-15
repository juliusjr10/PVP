import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import MenuItem from '@mui/material/MenuItem';

export default function FriendsList() {
    const [userFriends, setUserFriends] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
    const [challengedFriend, setChallengedFriend] = useState(null);
    const [challengeType, setChallengeType] = useState('');
    const [habit, setHabit] = useState('');
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        // Fetch habits when component mounts
        fetchHabits();
        fetchUserFriends();
    }, []);

    const fetchHabits = async () => {
        try {
            const response = await fetch('https://localhost:7200/api/Habits/getallhabits', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('jwt')}`,
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch habits');
            }
            const data = await response.json();
            if (data && Array.isArray(data.$values)) {
                setHabits(data.$values);
            } else {
                console.error('Invalid habits data format:', data);
            }
        } catch (error) {
            console.error('Error fetching habits:', error);
        }
    };

    const fetchUserFriends = async () => {
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

    const handleChallengeFriend = (friend) => {
        setChallengedFriend(friend);
        setIsChallengeModalOpen(true);
    };

    const handleCloseChallengeModal = () => {
        setIsChallengeModalOpen(false);
    };

    const handleChallengeTypeChange = (event) => {
        setChallengeType(event.target.value);
    };

    const handleHabitChange = (event) => {
        setHabit(event.target.value);
    };

    const challengeTypes = [
        { value: '3day', label: '3 days challenge' },
        { value: 'week', label: '1 week challenge' },
        { value: 'month', label: '1 month challenge' },
        // Add more types as needed
    ];

    const handleChallengeSubmit = async () => {
        try {
            // Send challenge request to the backend
            // You can use fetch or any other method to send the challenge request
            console.log(`Challenging ${challengedFriend.username} with ${challengeType} for habit ${habit}`);
            setIsChallengeModalOpen(false);
        } catch (error) {
            console.error('Error sending challenge:', error);
            // Handle error, if any
        }
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
                if (response.status === 400) {
                    const data = await response.json();
                    setErrorMessage(data.message); // Set error message from response data
                } else {
                    throw new Error('Failed to add friend');
                }
            } else {
                console.log('Friend added successfully');
                setUsername('');
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error adding friend:', error);
            // Handle other errors, if any
        }
    };

    const renderRow = (friend, index, style, handleChallengeFriend) => {
        const handleDeleteFriend = async () => {
            const confirmDelete = window.confirm("Are you sure you want to delete this friend?");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`https://localhost:7200/api/Friends/delete/${friend.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('jwt')}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete friend');
                }
                console.log('Friend deleted successfully');

                // Reload the page after successful deletion
                window.location.reload();
            } catch (error) {
                console.error('Error deleting friend:', error);
                // Handle error, such as displaying an error message to the user
            }
        };

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar alt={friend.username} src="../assets/react.svg" sx={{ width: 32, height: 32 }} />
                    </ListItemAvatar>
                    <ListItemText primary={friend.username} />
                    <Button variant="contained" color="secondary" onClick={handleDeleteFriend} sx={{ marginRight: '10px' }}>
                        Delete
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleChallengeFriend(friend)} sx={{ mr: 1 }}>
                        Challenge
                    </Button>
                </ListItemButton>
            </ListItem>
        );
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
                {({ index, style }) => renderRow(userFriends[index], index, style, handleChallengeFriend)}
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
                    {errorMessage && (
                        <Typography variant="body2" color="error" gutterBottom>
                            {errorMessage}
                        </Typography>
                    )}
                    <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mt: 2 }}>
                        Add
                    </Button>

                </Box>
            </Modal>
            <Modal
                open={isChallengeModalOpen}
                onClose={handleCloseChallengeModal}
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
                        Challenge Friend
                    </Typography>
                    <TextField
                        id="challengeType"
                        select
                        label="Challenge Type"
                        value={challengeType}
                        onChange={handleChallengeTypeChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {challengeTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="habit"
                        select
                        label="Habit"
                        value={habit}
                        onChange={handleHabitChange}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {habits.map((habit) => (
                            <MenuItem key={habit.id} value={habit.name}>
                                {habit.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" color="primary" onClick={handleChallengeSubmit} sx={{ mt: 2 }}>
                        Challenge
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}