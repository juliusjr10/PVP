import React, { useState, useEffect } from 'react';
import AddHabitCard from '../components/AddHabitCard';
import SmokingCard from '../components/SmokingCard';
import MeditateCard from '../components/MeditateCard';
import AlcoholCard from '../components/AlcoholCard';
import WaterCard from '../components/WaterCard';
import FoodCard from '../components/FoodCard';
import SmokingHabit from '../components/SmokingHabit';
import FoodHabit from '../components/FoodHabit';
import WaterHabit from '../components/WaterHabit';
import MeditateHabit from '../components/MeditateHabit';
import AlcoholHabit from '../components/AlcoholHabit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function HabitBar() {
    const [userHabits, setUserHabits] = useState([]);
    const [open, setOpen] = useState(false); // State to manage sidebar open/close
    const [showSmokingHabit, setShowSmokingHabit] = useState(false); // State to manage visibility of SmokingHabit
    const [showFoodHabit, setShowFoodHabit] = useState(false); // State to manage visibility of FoodHabit
    const [showWaterHabit, setShowWaterHabit] = useState(false); // State to manage visibility of WaterHabit
    const [showMeditateHabit, setShowMeditateHabit] = useState(false); // State to manage visibility of MeditateHabit
    const [showAlcoholHabit, setShowAlcoholHabit] = useState(false); // State to manage visibility of AlcoholHabit

    useEffect(() => {
        // Close the sidebar whenever userHabits change
        setOpen(false);
    }, [userHabits]);

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

    // Function to delete user habit
    const deleteHabit = async (habitId) => {
        try {
            const response = await fetch(`https://localhost:7200/api/habits/deletehabit/${habitId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to delete habit');
            }
            // Remove the deleted habit from userHabits state
            setUserHabits(prevHabits => prevHabits.filter(habit => habit.habitId !== habitId));
            // Close the sidebar immediately after deleting the habit if it's the Smoking habit
            if (habitId === 1) { // Smoking habitId
                setShowSmokingHabit(false);
            }
            if (habitId === 2) { // Meditation habitId
                setShowMeditateHabit(false);
            }
            if (habitId === 3) { // Water habitId
                setShowWaterHabit(false);
            }
            if (habitId === 4) { // Food habitId
                setShowFoodHabit(false);
            }
            if (habitId === 5) { // Alcohol habitId
                setShowAlcoholHabit(false);
            }
            setOpen(false); // Always close the sidebar
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    // Function to toggle visibility of SmokingHabit
    const toggleSmokingHabit = () => {
        setShowSmokingHabit(prev => !prev);
        setShowFoodHabit(false); // Close FoodHabit
        setShowWaterHabit(false); // Close WaterHabit
        setShowMeditateHabit(false); // Close MeditateHabit
        setShowAlcoholHabit(false); // Close AlcoholHabit
    };

    // Function to toggle visibility of FoodHabit
    const toggleFoodHabit = () => {
        setShowFoodHabit(prev => !prev);
        setShowSmokingHabit(false); // Close SmokingHabit
        setShowWaterHabit(false); // Close WaterHabit
        setShowMeditateHabit(false); // Close MeditateHabit
        setShowAlcoholHabit(false); // Close AlcoholHabit
    };

    // Function to toggle visibility of WaterHabit
    const toggleWaterHabit = () => {
        setShowWaterHabit(prev => !prev);
        setShowSmokingHabit(false); // Close SmokingHabit
        setShowFoodHabit(false); // Close FoodHabit
        setShowMeditateHabit(false); // Close MeditateHabit
        setShowAlcoholHabit(false); // Close AlcoholHabit
    };

    // Function to toggle visibility of MeditateHabit
    const toggleMeditateHabit = () => {
        setShowMeditateHabit(prev => !prev);
        setShowSmokingHabit(false); // Close SmokingHabit
        setShowFoodHabit(false); // Close FoodHabit
        setShowWaterHabit(false); // Close WaterHabit
        setShowAlcoholHabit(false); // Close AlcoholHabit
    };

    const toggleAlcoholHabit = () => {
        setShowAlcoholHabit(prev => !prev);
        setShowFoodHabit(false); // Close FoodHabit
        setShowWaterHabit(false); // Close WaterHabit
        setShowMeditateHabit(false); // Close MeditateHabit
        setShowSmokingHabit(false); // Close SmokingHabit
    };

    const allHabitsPresent = userHabits.length === 5;

    return (
        <Box sx={{ width: "50%", mt: '75px' }}>
            <Typography variant='h2' sx={{
                width:'100%',
                backgroundColor:'#ffffff',
                marginBottom: '25px',
                display: {
                    xl: 'flex',
                    lg: 'flex',
                    md: 'flex',
                    sm: 'none',
                    xs: 'none'
                },
                justifyContent: 'center',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '5px',
                fontWeight: '600'

            }} >
                HABITS
            </Typography>
            <Box
                sx={{
                    transition: 'margin-left 0.3s ease',
                    margin: '0 auto',
                    rowGap: '20px',
                    columnGap: '1.33%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 200px)',
                    justifyContent: 'space-around',
                    marginBottom: '10px'
                }}
            >
                {/* Render existing habit cards */}
                {userHabits.map((habit, index) => {
                    switch (habit.habitId) {
                        case 1: // Smoking
                            return (
                                <Box key={index}>
                                    <SmokingCard
                                        onClick={toggleSmokingHabit}
                                        onDelete={deleteHabit} // Add this line
                                        habitId={habit.habitId} // Add this line
                                    />
                                </Box>
                            );
                        case 2: // Meditation
                            return (
                                <Box key={index}>
                                    <MeditateCard
                                        onClick={toggleMeditateHabit}
                                        onDelete={deleteHabit} // Add this line
                                        habitId={habit.habitId}
                                    />
                                </Box>
                            );
                        case 3: // Water
                            return (
                                <Box key={index}>
                                    <WaterCard
                                        onClick={toggleWaterHabit}
                                        onDelete={deleteHabit} // Add this line
                                        habitId={habit.habitId}
                                    />
                                </Box>
                            );
                        case 4: // Food
                            return (
                                <Box key={index}>
                                    <FoodCard
                                        onClick={toggleFoodHabit}
                                        onDelete={deleteHabit} // Add this line
                                        habitId={habit.habitId}
                                    />
                                </Box>
                            );
                        case 5: // Alcohol
                            return (
                                <Box key={index}>
                                    <AlcoholCard
                                        onClick={toggleAlcoholHabit}
                                        onDelete={deleteHabit} // Add this line
                                        habitId={habit.habitId}
                                    />
                                </Box>
                            );
                        default:
                            return null;
                    }
                })}

                {!allHabitsPresent && (
                        <AddHabitCard addUserHabit={addUserHabit} />
                )}
                {showSmokingHabit && (
                        <SmokingHabit />
                )}
                {showMeditateHabit && (
                        <MeditateHabit />
                )}
                {showWaterHabit && (
                        <WaterHabit />
                )}
                {showFoodHabit && (
                        <FoodHabit />
                )}

                {showAlcoholHabit && (
                        <AlcoholHabit />

                )}
            </Box>
        </Box>
    );
}
