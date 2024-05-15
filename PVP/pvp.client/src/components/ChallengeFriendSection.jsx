import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ChallengeFriendSection = ({ friend, selectedHabitName, selectedHabitId, onClose }) => {
    const [challengeName, setChallengeName] = useState('');
    const [challengeType, setChallengeType] = useState('');

    const handleChallengeNameChange = (event) => {
        setChallengeName(event.target.value);
    };

    const handleChallengeTypeChange = (event) => {
        setChallengeType(event.target.value);
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };

    const handleChallengeSend = async () => {
        try {
            const requestBody = {
                receiverId: friend.id,
                name: challengeName,
                challengeType: 0 // Assuming 0 is a default value for challengeType
            };

            console.log('Request Body:', requestBody); // Log the request body

            const response = await fetch(`https://localhost:7200/api/Challenge/createrequest/${selectedHabitId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('jwt')}`,
                },
                credentials: 'include',
                body: JSON.stringify(requestBody), // Convert the body to JSON string
            });
            if (!response.ok) {
                throw new Error('Failed to request a challenge');
            }
        } catch (error) {
            console.error('Error adding friend:', error);
            // Handle other errors, if any
        }
    };
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Challenge {friend.username} in {selectedHabitName}
            </Typography>
            <TextField
                id="challenge-name"
                label="Challenge Name"
                value={challengeName}
                onChange={handleChallengeNameChange}
                fullWidth
                variant="outlined"
                margin="normal"
            />
            <Select
                id="challenge-type"
                value={challengeType}
                onChange={handleChallengeTypeChange}
                fullWidth
                variant="outlined"
                margin="normal"
                displayEmpty
            >
                <MenuItem value="" disabled>
                    Select Challenge Type
                </MenuItem>
                <MenuItem value="Day">Day</MenuItem>
                <MenuItem value="Week">Week</MenuItem>
                <MenuItem value="Month">Month</MenuItem>
                {/* Add more challenge types as needed */}
            </Select>
            <Button variant="contained" color="primary" onClick={handleChallengeSend} sx={{ marginTop: '10px' }}>
                Send Challenge
            </Button>
            <Button variant="contained" onClick={onClose} style={{ marginLeft: '10px', marginTop: '10px' }}>
                Cancel
            </Button>
        </Box>
    );
};

// Prop Types validation
ChallengeFriendSection.propTypes = {
    friend: PropTypes.object.isRequired, // assuming friend is an object
    selectedHabitName: PropTypes.string.isRequired,
    selectedHabitId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ChallengeFriendSection;