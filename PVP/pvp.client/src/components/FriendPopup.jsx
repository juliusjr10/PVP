import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import SmokingCard from '../components/SmokingCard';
import MeditateCard from '../components/MeditateCard';
import WaterCard from '../components/WaterCard';
import FoodCard from '../components/FoodCard';
import ChallengeFriendSection from '../components/ChallengeFriendSection'; // Import your ChallengeFriendSection component

// Habit name mapping
const habitIdToNameMap = {
    1: 'Smoking',
    2: 'Meditation',
    3: 'Water',
    4: 'Food',
};

export default function FriendPopup({ friend, onClose }) {
    const [userHabits, setUserHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showChallengeSection, setShowChallengeSection] = useState(false); // State to control visibility of challenge section
    const [selectedHabitName, setSelectedHabitName] = useState(null); // State to store selected habit name

    useEffect(() => {
        const fetchUserHabits = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://localhost:7200/api/Habits/getuserhabits/${friend.id}`);
                const data = await response.json(); // Parse response body as JSON
                setUserHabits(data.$values); // Accessing the $values array
                console.log('User habits:', data); // Log user habits to console
            } catch (error) {
                console.error('Error fetching user habits:', error);
            }
            setIsLoading(false);
        };

        if (friend) {
            fetchUserHabits();
        }
    }, [friend]);

    const handleChallengeClick = (habitName) => {
        setShowChallengeSection(true);
        setSelectedHabitName(habitName); // Set the selected habit name
    };

    return (
        <Modal
            open={!!friend}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600, // Increased width to make the popup window bigger
                    maxWidth: '90%', // Added maxWidth to ensure responsiveness
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Friend Information
                </Typography>
                {friend && (
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            Username: {friend.username}
                        </Typography>
                        {Array.isArray(userHabits) && userHabits.length > 0 ? (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    User Habits:
                                </Typography>
                                <Grid container spacing={1}> {/* Reduced spacing between Grid items */}
                                    {userHabits.map((habit, index) => {
                                        const habitName = habitIdToNameMap[habit.habitId]; // Get habit name from habitId
                                        return (
                                            <Grid item xs={4} key={index} onClick={() => handleChallengeClick(habitName)}>
                                                {habitName === 'Smoking' && <SmokingCard />}
                                                {habitName === 'Meditation' && <MeditateCard />}
                                                {habitName === 'Water' && <WaterCard />}
                                                {habitName === 'Food' && <FoodCard />}
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        ) : (
                            <Typography variant="body2">No habits found for this user.</Typography>
                        )}
                    </Box>
                )}
                {/* Challenge friend section */}
                {showChallengeSection && (
                    <ChallengeFriendSection
                        friend={friend}
                        selectedHabitName={selectedHabitName} // Pass selected habit name
                        onClose={() => setShowChallengeSection(false)}
                    />
                )}
            </Box>
        </Modal>
    );
}