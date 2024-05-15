import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
};
function ChallengeDetailsPopup({ challenge, onClose }) {
    const [habitName, setHabitName] = useState('');
    const [firstChallengerName, setFirstChallengerName] = useState('');
    const [secondChallengerName, setSecondChallengerName] = useState('');

    useEffect(() => {
        if (challenge) {
            fetchHabitName(challenge.habitId);
            fetchChallengerNames(challenge.firstChallengerId, challenge.secondChallengerId);
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

    const fetchChallengerNames = async (firstChallengerId, secondChallengerId) => {
        try {
            const response1 = await fetchUserInfo(firstChallengerId);
            const response2 = await fetchUserInfo(secondChallengerId);

            if (response1 && response2) {
                setFirstChallengerName(response1.name);
                setSecondChallengerName(response2.name);
            }
        } catch (error) {
            console.error('Error fetching challenger details:', error);
        }
    };

    const fetchUserInfo = async (userId) => {
        try {
            const response = await fetch(`https://localhost:7200/api/Auth/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('jwt')}`,
                    // Add any necessary authorization headers
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch user details for user ID ${userId}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <Dialog open={challenge !== null} onClose={onClose}>
            <DialogTitle>Challenge Details</DialogTitle>
            <DialogContent>
                {challenge && (
                    <div>
                        <Typography variant="subtitle1" gutterBottom>
                            Name: {challenge.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Habit: {habitName}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            First Challenger: {firstChallengerName}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Second Challenger: {secondChallengerName}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Start Date: {new Date(challenge.challengeStart).toLocaleString()}
                        </Typography>
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

export default ChallengeDetailsPopup;