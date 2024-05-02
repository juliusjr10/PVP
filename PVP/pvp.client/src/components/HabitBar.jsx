import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import AddHabitCard from '../components/AddHabitCard';
import SmokingCard from '../components/SmokingCard';
import MeditateCard from '../components/MeditateCard';
import WaterCard from '../components/WaterCard';
import FoodCard from '../components/FoodCard';
import SmokingHabit from '../components/SmokingHabit';
import FoodHabit from '../components/FoodHabit';
import WaterHabit from '../components/WaterHabit';
import MeditateHabit from '../components/MeditateHabit';

export default function HabitBar() {
    const [userHabits, setUserHabits] = useState([]);
    const [open, setOpen] = useState(false); // State to manage sidebar open/close
    const [showSmokingHabit, setShowSmokingHabit] = useState(false); // State to manage visibility of SmokingHabit
    const [showFoodHabit, setShowFoodHabit] = useState(false); // State to manage visibility of FoodHabit
    const [showWaterHabit, setShowWaterHabit] = useState(false); // State to manage visibility of WaterHabit
    const [showMeditateHabit, setShowMeditateHabit] = useState(false); // State to manage visibility of MeditateHabit

    // Function to add user habit
    const addUserHabit = (newHabit) => {
        setUserHabits(prevHabits => [...prevHabits, newHabit]);
    };

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
                if (data && data.$values && Array.isArray(data.$values)) {
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

    // Function to toggle visibility of SmokingHabit
    const toggleSmokingHabit = () => {
        setShowSmokingHabit(prev => !prev);
        setShowFoodHabit(false); // Close FoodHabit
        setShowWaterHabit(false); // Close WaterHabit
        setShowMeditateHabit(false); // Close MeditateHabit
    };

    // Function to toggle visibility of FoodHabit
    const toggleFoodHabit = () => {
        setShowFoodHabit(prev => !prev);
        setShowSmokingHabit(false); // Close SmokingHabit
        setShowWaterHabit(false); // Close WaterHabit
        setShowMeditateHabit(false); // Close MeditateHabit
    };

    // Function to toggle visibility of WaterHabit
    const toggleWaterHabit = () => {
        setShowWaterHabit(prev => !prev);
        setShowSmokingHabit(false); // Close SmokingHabit
        setShowFoodHabit(false); // Close FoodHabit
        setShowMeditateHabit(false); // Close MeditateHabit
    };

    // Function to toggle visibility of MeditateHabit
    const toggleMeditateHabit = () => {
        setShowMeditateHabit(prev => !prev);
        setShowSmokingHabit(false); // Close SmokingHabit
        setShowFoodHabit(false); // Close FoodHabit
        setShowWaterHabit(false); // Close WaterHabit
    };


    return (
        <Grid
            container
            spacing={0.6}
            mt={8}
            ml={open ? 20 : 0} // Adjust marginLeft when sidebar is open
            sx={{
                transition: 'margin-left 0.3s ease',
            }}
        >
            {/* Render existing habit cards */}
            {userHabits.map((habit, index) => {
                switch (habit.habitId) {
                    case 1: // Smoking
                        return (
                            <Grid item xs={1.5} key={index}>
                                <SmokingCard onClick={toggleSmokingHabit} />
                            </Grid>
                        );
                    case 2: // Meditation
                        return (
                            <Grid item xs={1.5} key={index}>
                                <MeditateCard onClick={toggleMeditateHabit} />
                            </Grid>
                        );
                    case 3: // Water
                        return (
                            <Grid item xs={1.5} key={index}>
                                <WaterCard onClick={toggleWaterHabit} />
                            </Grid>
                        );
                    case 4: // Food
                        return (
                            <Grid item xs={1.5} key={index}>
                                <FoodCard onClick={toggleFoodHabit} />
                            </Grid>
                        );
                    default:
                        return null;
                }
            })}

            {/* Render AddHabitCard */}
            <Grid item xs={1.5}>
                <AddHabitCard addUserHabit={addUserHabit} />
            </Grid>

            {/* Render SmokingHabit if showSmokingHabit is true */}
            {showSmokingHabit && (
                <Grid item xs={12}>
                    <SmokingHabit />
                </Grid>
            )}

            {/* Render MeditateHabit if showMeditateHabit is true */}
            {showMeditateHabit && (
                <Grid item xs={12}>
                    <MeditateHabit />
                </Grid>
            )}

            {/* Render WaterHabit if showWaterHabit is true */}
            {showWaterHabit && (
                <Grid item xs={12}>
                    <WaterHabit />
                </Grid>
            )}

            {/* Render FoodHabit if showFoodHabit is true */}
            {showFoodHabit && (
                <Grid item xs={12}>
                    <FoodHabit />
                </Grid>
            )}
        </Grid>
    );
}
