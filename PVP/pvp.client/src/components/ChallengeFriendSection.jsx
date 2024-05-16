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
    const [showMessage, setShowMessage] = useState(false);
    const [challengeNameError, setChallengeNameError] = useState('');
    const [challengeTypeError, setChallengeTypeError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChallengeNameChange = (event) => {
        setChallengeName(event.target.value);
        // Clear error message when the challenge name is being typed
        setChallengeNameError('');
    };

    const handleChallengeTypeChange = (event) => {
        setChallengeType(event.target.value);
        // Clear error message when the challenge type is selected
        setChallengeTypeError('');
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };

    const handleChallengeSend = async () => {
        try {
            if (challengeName.trim() === '') {
                setChallengeNameError('Please enter a challenge name');
                return;
            }

            if (challengeType === '') {
                setChallengeTypeError('Please select a challenge type');
                return;
            }

            const requestBody = {
                receiverId: friend.id,
                name: challengeName,
                challengeType: parseInt(challengeType, 10) || 0 // Convert to number, fallback to 0 if NaN
            };

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
                if (response.status === 400) {
                    const errorMessage = await response.text(); // Get the error message from the response body
                    throw new Error(errorMessage);
                }
                throw new Error('Failed to request a challenge');
            }

            setShowMessage(true); // Show success message
            setSuccessMessage('Challenge sent successfully!');
            onClose(); // Close the popup window
        } catch (error) {
            console.error('Error sending challenge:', error);
            // Show error message
            alert('Error: ' + error.message);
            // Handle other errors, if any
        }
    };

    const handleCloseAndShowMessage = () => {
        onClose();
        setShowMessage(false); // Hide the message when closing the popup
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Challenge {friend.username} in {selectedHabitName}
            </Typography>
            {showMessage && (
                <Typography variant="body1" style={{ marginTop: '10px', color: 'green' }}>
                    {successMessage}
                </Typography>
            )}
            <TextField
                id="challenge-name"
                label="Challenge Name"
                value={challengeName}
                onChange={handleChallengeNameChange}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!challengeNameError}
                helperText={challengeNameError}
            />
            <Select
                id="challenge-type"
                value={challengeType}
                onChange={handleChallengeTypeChange}
                fullWidth
                variant="outlined"
                margin="normal"
                displayEmpty
                error={!!challengeTypeError}
                renderValue={(value) => {
                    if (value === '') {
                        return <em>Select Challenge Type</em>;
                    }
                    // Map the numeric value to its corresponding challenge type
                    const challengeTypes = {
                        '0': 'Week',
                        '1': 'Month',
                        '2': 'Three Day',
                        // Add more challenge types as needed
                    };
                    return challengeTypes[value];
                }}
            >
                <MenuItem value="" disabled>
                    Select Challenge Type
                </MenuItem>
                <MenuItem value="2">Three Day</MenuItem>
                <MenuItem value="0">Week</MenuItem>
                <MenuItem value="1">Month</MenuItem>
                {/* Add more challenge types as needed */}
            </Select>
            <Button variant="contained" color="primary" onClick={handleChallengeSend} sx={{ marginTop: '10px' }}>
                Send Challenge
            </Button>
            <Button variant="contained" onClick={handleCloseAndShowMessage} style={{ marginLeft: '10px', marginTop: '10px' }}>
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