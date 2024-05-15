import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ChallengeFriendSection = ({ friend, selectedHabitName, onClose }) => {
    const [challengeMessage, setChallengeMessage] = useState('');
    const [challengeType, setChallengeType] = useState('');

    const handleChallengeMessageChange = (event) => {
        setChallengeMessage(event.target.value);
    };

    const handleChallengeTypeChange = (event) => {
        setChallengeType(event.target.value);
    };

    const handleChallengeSend = () => {
        // Implement your logic to send the challenge message to the friend
        console.log('Sending challenge message:', challengeMessage);
        console.log('Selected challenge type:', challengeType);
        // You can add further logic here, such as sending the message via API
        // Once the challenge is sent, you can close the section
        onClose();
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Challenge {friend.username} in {selectedHabitName} {/* Display habit name */}
            </Typography>
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
                <MenuItem value="Fitness">Fitness</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Wellness">Wellness</MenuItem>
                {/* Add more challenge types as needed */}
            </Select>
            <Button variant="contained" color="primary" onClick={handleChallengeSend} sx={{ marginTop: '10px' } }>
                Send Challenge
            </Button>
            <Button variant="contained" onClick={onClose} style={{ marginLeft: '10px',  marginTop: '10px' }}>
                Cancel
            </Button>
        </Box>
    );
};

export default ChallengeFriendSection;