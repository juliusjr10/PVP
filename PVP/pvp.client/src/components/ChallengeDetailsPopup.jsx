import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { format, differenceInDays } from 'date-fns';


function ChallengeDetailsPopup({ challenge, onClose, userId }) {
    const [habitName, setHabitName] = useState('');
    const [checkIns, setCheckIns] = useState([]);
    const [challengeEndDate, setChallengeEndDate] = useState(null); // State to hold challenge end date
    const [user, setUser] = useState(null); // State to hold user data
    const [userStreak, setUserStreak] = useState(0); // State to hold user's streak

    useEffect(() => {
        if (challenge) {
            fetchHabitName(challenge.habitId);
            calculateEndDate(challenge);
            console.log('Challenge Type:', challenge.challengeType); // Log the challenge type
        }
    }, [challenge]);

    const fetchHabitName = async (habitId) => {
        try {
            const response = await fetch(`https://localhost:7200/api/Habits/gethabitbyid/${habitId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authorization headers
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch habit details');
            }
            const data = await response.json();
            if (data) {
                setHabitName(data.name);
            }
        } catch (error) {
            console.error('Error fetching habit details:', error);
        }
    };

    const calculateEndDate = (challenge) => {
        const startDate = new Date(challenge.challengeStart);
        let endDate = new Date(startDate); // Initialize end date as the start date

        // Add days based on challenge type
        switch (challenge.challengeType) {
            case 0: // Type 0: Add 7 days
                endDate.setDate(startDate.getDate() + 7);
                break;
            case 1: // Type 1: Add 30 days
                endDate.setDate(startDate.getDate() + 30);
                break;
            case 2: // Type 2: Add 3 days
                endDate.setDate(startDate.getDate() + 3);
                break;
            default:
                break;
        }

        // Set the calculated end date
        setChallengeEndDate(endDate);
    };


    useEffect(() => {
        const fetchCheckIns = async (habitId) => {
            try {
                const response = await fetch(`https://localhost:7200/api/Habits/getuserhabitcheckins/${habitId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch check-in data');
                }
                const data = await response.json();
                const checkInsArray = data && data['$values'] ? data['$values'] : [];
                console.log('Check-ins:', checkInsArray); // Logging check-ins
                setCheckIns(checkInsArray);
            } catch (error) {
                console.error('Error fetching check-in data:', error);
            }
        };

        if (challenge) {
            fetchHabitName(challenge.habitId);
            fetchCheckIns(challenge.habitId); // Pass habitId here
        }
    }, [challenge]); // Include challenge in dependencies

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('https://localhost:7200/api/Auth/user', {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }

                    const content = await response.json();
                    console.log('User Data:', content); // Logging user data
                    setUser(content); // Update user state
                    // Calculate and set user streak here
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        )();
    }, []);



    // Method to update streak via API
    const updateStreak = async (streak) => {
        try {
            const response = await fetch(`https://localhost:7200/api/Challenge/setstreak/${challenge.id}/${streak}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    // Add any other necessary data to send to the server
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update streak');
            }
            // If update is successful, you might want to refresh the challenge data or perform other actions
            // For example:
            // Call a function to refresh the challenge data
            // refreshChallengeData();
        } catch (error) {
            console.error('Error updating streak:', error);
        }
    };



    // Update streak when the popup is opened
    useEffect(() => {
        if (challenge) {
            updateStreak(userStreak);
        }
    }, [challenge]); // Only update streak when challenge changes


    return (
        <Dialog open={challenge !== null} onClose={onClose}>
            <DialogTitle style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: "white", backgroundColor:"#5a00ec" }}>Challenge Details</DialogTitle>
            <DialogContent>
                {challenge && (
                    <div>
                        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {challenge.name}
                        </Typography>

                        <Typography variant="subtitle1" gutterBottom>
                            Habit: {habitName}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Challenger: {user && user.username ? user.username : 'Unknown'}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Start Date: {new Date(challenge.challengeStart).toLocaleString()}
                        </Typography>

                        {challengeEndDate && ( // Render end date if available
                            <Typography variant="subtitle1" gutterBottom>
                                End Date: {challengeEndDate.toLocaleString()}
                            </Typography>
                        )}

                        <Typography variant="subtitle1" gutterBottom>
                            Your streak: {userStreak} days
                        </Typography>
                        {user.id === challenge.firstChallengerId && (
                            <Typography variant="subtitle1" gutterBottom>
                                Opponent streak: {challenge.secondChallengerStreak}
                            </Typography>
                        )}

                        {user.id === challenge.secondChallengerId && (
                            <Typography variant="subtitle1" gutterBottom>
                                Opponent streak: {challenge.firstChallengerStreak}
                            </Typography>
                        )}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// Prop Types validation
ChallengeDetailsPopup.propTypes = {
    challenge: PropTypes.shape({
        name: PropTypes.string.isRequired,
        habitId: PropTypes.number.isRequired,
        challengeStart: PropTypes.string.isRequired,
        challengerId: PropTypes.number.isRequired,
        secondChallengerStreak: PropTypes.number.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
};

export default ChallengeDetailsPopup;