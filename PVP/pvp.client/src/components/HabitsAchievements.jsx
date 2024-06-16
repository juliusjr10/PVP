import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ThreeDaysCard from './achievements/ThreeDaysCard';
import FiveDaysCard from './achievements/FiveDaysCard';
import OneWeekCard from './achievements/OneWeekCard';
import TwoWeekCard from './achievements/TwoWeekCard';
import NoAchCard from './achievements/NoAchCard';


// Mapping habitId to habitName
const habitIdToName = {
    1: 'Smoking',
    2: 'Meditation',
    3: 'Water',
    4: 'Healthy food',
    5: 'Alcohol',
    6: 'Reading',
    7: 'Sleeping',
    8: 'Workout',
    9: 'Screen time',
};

export default function HabitsAchievements() {
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [userHabits, setUserHabits] = useState([]);

    useEffect(() => {
        const fetchUserHabits = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/habits/getuserhabits', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user habits');
                }
                const data = await response.json();
                console.log('Fetched user habits:', data);

                if (data && data.$values && Array.isArray(data.$values)) {
                    const habitsWithNames = data.$values.map(habit => ({
                        ...habit,
                        habitName: habitIdToName[habit.habitId]
                    }));
                    setUserHabits(habitsWithNames);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching user habits:', error);
            }
        };

        fetchUserHabits();
    }, []);

    const handleMenuClick = (habit) => {
        setSelectedHabit(habit);
    };

    const habitCards = {
        Smoking: [<ThreeDaysCard key="smoking1" />, <FiveDaysCard key="smoking2" />, <OneWeekCard key="smoking3" />, <TwoWeekCard key="smoking4" />],
        Meditation: [<ThreeDaysCard key="meditate1" />],
        Water: [<ThreeDaysCard key="water1" />, <FiveDaysCard key="water2" />, <OneWeekCard key="water3" />],
        "Healthy food": [<ThreeDaysCard key="healthy1" />, <FiveDaysCard key="healthy2" />],
        Alcohol: [<ThreeDaysCard key="alcohol1" />],
        Reading: [<ThreeDaysCard key="reading1" />, <FiveDaysCard key="reading2" />, <OneWeekCard key="reading3" />],
        Sleeping: [<NoAchCard key="sleeping1" />,],
        Workout: [<NoAchCard key="workout1" />],
        "Screen time": [<NoAchCard key="screentime1" />,],
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', justifyContent: 'center' }}>
            <CssBaseline />
            <Box sx={{ p: 10 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5" gutterBottom sx={{ fontSize: '2rem', color: '#333333', textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                        Habits achievements
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    {userHabits.length === 0 ? (
                        <Typography variant="h6">No habits found</Typography>
                    ) : (
                        userHabits.map(habit => (
                            <div key={habit.id} onClick={() => handleMenuClick(habit.habitName)}>
                                <Typography variant="h5">{habit.habitName}</Typography>
                            </div>
                        ))
                    )}
                </Stack>
                {selectedHabit && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            {selectedHabit} Achievements
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {habitCards[selectedHabit]}
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
