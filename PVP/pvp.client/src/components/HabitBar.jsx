import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import SmokingCard from '../components/SmokingCard';
import MeditateCard from '../components/MeditateCard';
import WaterCard from '../components/WaterCard';
import AddHabitCard from '../components/AddHabitCard';
import FoodCard from '../components/FoodCard';
import SmokingHabit from './SmokingHabit';
import MeditateHabit from './MeditateHabit';
import WaterHabit from './WaterHabit';
import FoodHabit from './FoodHabit';

export default function HabitBar() {
    const [expandedCard, setExpandedCard] = useState(null);
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
                if (data && Array.isArray(data.$values)) {
                    setUserHabits(data.$values);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching user habits:', error);
            }
        };

        fetchUserHabits();
    }, []);

    const toggleExpand = (cardType) => {
        setExpandedCard(expandedCard === cardType ? null : cardType);
    };

    const addUserHabit = (newHabit) => {
        setUserHabits([...userHabits, newHabit]);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                <Grid container spacing={3}>
                    {userHabits.map((habit) => (
                        <Grid item xs={6} md={3} key={habit.id}>
                            {habit.id === 1 && (
                                <SmokingCard onClick={() => toggleExpand('smoking')} expanded={expandedCard === 'smoking'} />
                            )}
                            {habit.id === 2 && (
                                <MeditateCard onClick={() => toggleExpand('meditation')} expanded={expandedCard === 'meditation'} />
                            )}
                            {habit.id === 3 && (
                                <WaterCard onClick={() => toggleExpand('water')} expanded={expandedCard === 'water'} />
                            )}
                            {habit.id === 4 && (
                                <FoodCard onClick={() => toggleExpand('food')} expanded={expandedCard === 'food'} />
                            )}
                        </Grid>
                    ))}
                    <Grid item xs={12} md={3}>
                        <AddHabitCard onClick={() => toggleExpand('add')} expanded={expandedCard === 'add'} addUserHabit={addUserHabit} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ p: 2, flexGrow: 1 }}>
                {expandedCard === 'smoking' && <SmokingHabit />}
                {expandedCard === 'meditation' && <MeditateHabit />}
                {expandedCard === 'water' && <WaterHabit />}
                {expandedCard === 'food' && <FoodHabit />}
            </Box>
        </Box>
    );
}
