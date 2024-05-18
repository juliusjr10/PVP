import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import ChallengeDetailsPopup from './ChallengeDetailsPopup'

function ChallengesList() {
    const [userChallenges, setUserChallenges] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    useEffect(() => {
        const fetchUserChallenges = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/Challenge', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('jwt')}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user challenges');
                }
                const data = await response.json();
                if (data && data.$values && Array.isArray(data.$values)) {
                    setUserChallenges(data.$values); // Set the challenges array from $values
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching user challenges:', error);
            }
        };

        fetchUserChallenges();
    }, []);



    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };

    const handleChallengeClick = (challenge) => {
        setSelectedChallenge(challenge);
    };

    return (
        <Box sx={{
            width: '50%',
            flexDirection: 'column',
            marginBottom: '100px',
            marginTop: '150px',
            backgroundColor: '#ffffff'

        }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                CHALLENGES
            </Typography>
            <Box sx={{
                margin: '0 auto',
                rowGap: '20px',
                columnGap: '1.33%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, 250px)',
                justifyContent: 'space-around',
                marginBottom: '10px'
            }}>
                {userChallenges.map((challenge, index) => (
                    <Box item key={index}>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                boxShadow: 1,
                                p: 2,
                                borderRadius: 1,
                                transition: 'box-shadow 0.3s',
                                '&:hover': {
                                    boxShadow: 5,
                                },
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {challenge.name}
                            </Typography>

                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Start Date: {new Date(challenge.challengeStart).toLocaleString()}
                            </Typography>
                            {/* Add more details about the challenge here */}
                            <Button onClick={() => handleChallengeClick(challenge)} variant="contained" color="primary">
                                View Details
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
            {/* Render the selected challenge details */}
            <ChallengeDetailsPopup challenge={selectedChallenge} onClose={() => setSelectedChallenge(null)} />
        </Box>
    );
}

export default ChallengesList;