import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Dialog, DialogTitle, DialogContent, FormControl, Select, MenuItem, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

const AddHabitCard = ({ onClick, addUserHabit }) => {
    const [habits, setHabits] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState('');
    const [userHabits, setUserHabits] = useState([]);
    const [filteredHabits, setFilteredHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/habits/getallhabits', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch habits');
                }
                const data = await response.json();
                if (data && Array.isArray(data.$values)) {
                    setHabits(data.$values);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching habits:', error);
            }
        };

        fetchHabits();
    }, []);

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
    }, [userHabits]);

    useEffect(() => {
        const filteredHabits = habits.filter(habit => !userHabits.some(userHabit => userHabit.id === habit.id));
        setFilteredHabits(filteredHabits);
    }, [habits, userHabits]);

    const handleCardClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedHabit('');
    };

    const handleAddHabit = async () => {
        try {
            const response = await fetch('https://localhost:7200/api/habits/adduserhabit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ HabitId: selectedHabit }),
            });
            if (!response.ok) {
                throw new Error('Failed to add habit');
            }
            const newHabit = await response.json();
            addUserHabit(newHabit); // Update the userHabits state with the new habit
        } catch (error) {
            console.error('Error adding habit:', error);
        } finally {
            setSelectedHabit('');
            handleCloseDialog();
        }
    };


    return (
        <>
            <Card sx={{ maxWidth: 150, height: 140, margin: 'auto', backgroundColor: '#f5f5f5', marginTop: '30px' }}>
                <CardActionArea onClick={handleCardClick} sx={{ cursor: 'pointer', height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <div style={{ backgroundColor: '#e0e0e0', padding: '6px', borderRadius: '50%', width: 'fit-content', margin: 'auto' }}>
                            <FaPlus style={{ fontSize: '3rem', margin: 'auto', color: '#757575' }} />
                        </div>
                        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#616161' }}>
                            Add Habit
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle sx={{ textAlign: 'center' }}>Add New Habit</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <Select
                                id="select-habit"
                                value={selectedHabit}
                                onChange={(e) => setSelectedHabit(e.target.value)}
                                displayEmpty
                                fullWidth
                            >
                                {filteredHabits.map((habit, index) => (
                                    <MenuItem key={index} value={habit.id}>{habit.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                        <Button onClick={handleCloseDialog} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddHabit} variant="contained" color="primary">
                            Add Habit
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

AddHabitCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    addUserHabit: PropTypes.func.isRequired,
};

export default AddHabitCard;