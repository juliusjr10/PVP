import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Dialog, DialogTitle, DialogContent, FormControl, Select, MenuItem, Button, Box, TextField } from '@mui/material';
import { FaPlus } from 'react-icons/fa';

const AddHabitCard = ({ addUserHabit }) => {
    const [habits, setHabits] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState('');
    const [userHabits, setUserHabits] = useState([]);
    const [filteredHabits, setFilteredHabits] = useState([]);

    const [tempSelectedValue, setTempSelectedValue] = useState(2000);
    const [tempSelectedUnit, setTempSelectedUnit] = useState('');
    const [tempSelectedGoal, setTempSelectedGoal] = useState('');

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
        const filteredHabits = habits.filter(habit => !userHabits.some(userHabit => userHabit.habitId === habit.id));
        setFilteredHabits(filteredHabits);
    }, [habits, userHabits]);

    useEffect(() => {
        if (selectedHabit === 2) { // Meditation habit
            setTempSelectedValue(1);
        } else if (selectedHabit === 3) { // Water habit
            setTempSelectedValue(2000);
        } else {
            setTempSelectedValue(3); // Default value
        }
    }, [selectedHabit]);

    const handleCardClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedHabit('');
        setTempSelectedGoal('');
        setTempSelectedUnit('');
        setTempSelectedValue(2000);
    };

    const handleAddHabit = async () => {
        try {
            let isGoal = true; // Set isGoal to true by default
            let goal1 = tempSelectedValue; // Set goal from the spin box
            let frequency1 = tempSelectedUnit;
            let time1 = tempSelectedGoal;
            // Conditionally set values based on selected habit id
            if (selectedHabit === 1 || selectedHabit === 5) {
                isGoal = false;
                goal1 = 0;
                frequency1 = "string";
                time1 = "string";
            }
            console.log("Request Body:", {
                HabitId: selectedHabit,
                IsGoal: isGoal,
                goal: goal1,
                frequency: frequency1,
                time: time1
            });
            const response = await fetch('https://localhost:7200/api/habits/adduserhabit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    HabitId: selectedHabit,
                    IsGoal: isGoal,
                    goal: goal1,
                    frequency: frequency1,
                    time: time1
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add habit');
            }
            const newHabit = await response.json();
            addUserHabit(newHabit); // Update the userHabits state with the new habit

            // Fetch user habits from the database after adding the new habit
            const userHabitsResponse = await fetch('https://localhost:7200/api/habits/getuserhabits', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!userHabitsResponse.ok) {
                throw new Error('Failed to fetch user habits');
            }
            const newUserHabits = await userHabitsResponse.json();
            if (newUserHabits && Array.isArray(newUserHabits.$values)) {
                setUserHabits(newUserHabits.$values);
            } else {
                console.error('Invalid data format:', newUserHabits);
            }

            // Remove the selected habit from the filtered habits list
            setFilteredHabits(prevFilteredHabits => prevFilteredHabits.filter(habit => habit.id !== selectedHabit));

            // Log the added habit
            console.log('Added habit:', newHabit);
        } catch (error) {
            console.error('Error adding habit:', error);
        } finally {
            handleCloseDialog();
        }
    };



    const renderGoalSection = () => {
        if (selectedHabit === 2) { // Meditation habit
            return (
                <>
                    <Typography variant="subtitle1" sx={{ marginBottom: '8px', marginLeft: '3px' }}>
                        Goal
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginLeft: '3px' }}>
                        <TextField
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={tempSelectedValue}
                            onChange={(e) => setTempSelectedValue(e.target.value)}
                            InputProps={{ inputProps: { min: 1 } }} // Set minimum value to 1
                        />
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                value={tempSelectedUnit}
                                onChange={(e) => setTempSelectedUnit(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Times">
                                    Times
                                </MenuItem>
                                <MenuItem value="mins">Mins</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 130 }}>
                            <Select
                                value={tempSelectedGoal}
                                onChange={(e) => setTempSelectedGoal(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Per day">
                                 Per day
                                </MenuItem>
                                <MenuItem value="Per week">Per week</MenuItem>
                                <MenuItem value="Per month">Per month</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </>
            );
        } else if (selectedHabit === 3) { // Water habit
            return (
                <>
                    <Typography variant="subtitle1" sx={{ marginBottom: '8px', marginLeft: '3px' }}>
                        Goal
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginLeft: '3px' }}>
                        <TextField
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={tempSelectedValue}
                            onChange={(e) => setTempSelectedValue(e.target.value)}
                            InputProps={{ inputProps: { min: 100 } }}
                        />
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                value={tempSelectedUnit}
                                onChange={(e) => setTempSelectedUnit(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Ml">
                                Ml
                                </MenuItem>
                                <MenuItem value="L">L</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 130 }}>
                            <Select
                                value={tempSelectedGoal}
                                onChange={(e) => setTempSelectedGoal(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Per day">
                                Per day
                                </MenuItem>
                                <MenuItem value="week">Per week</MenuItem>
                                <MenuItem value="month">Per month</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </>
            );
        } else if (selectedHabit === 4) { // Food habit
            return (
                <>
                    <Typography variant="subtitle1" sx={{ marginBottom: '8px', marginLeft: '3px' }}>
                        Goal
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginLeft: '3px' }}>
                        <TextField
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={tempSelectedValue}
                            onChange={(e) => setTempSelectedValue(e.target.value)}
                            InputProps={{ inputProps: { min: 1 } }} // Set minimum value to 1
                        />
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                value={tempSelectedUnit}
                                onChange={(e) => setTempSelectedUnit(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Times">
                                Times
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 130 }}>
                            <Select
                                value={tempSelectedGoal}
                                onChange={(e) => setTempSelectedGoal(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Per day">
                                Per day
                                </MenuItem>
                                <MenuItem value="Per week">Per week</MenuItem>
                                <MenuItem value="Per month">Per month</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </>
            );
        }
        else if (selectedHabit === 6) { // Reading habit
                return (
                    <>
                        <Typography variant="subtitle1" sx={{ marginBottom: '8px', marginLeft: '3px' }}>
                            Goal
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginLeft: '3px' }}>
                            <TextField
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={tempSelectedValue}
                                onChange={(e) => setTempSelectedValue(e.target.value)}
                                InputProps={{ inputProps: { min: 1 } }} // Set minimum value to 1
                            />
                            <FormControl sx={{ minWidth: 120 }}>
                                <Select
                                    value={tempSelectedUnit}
                                    onChange={(e) => setTempSelectedUnit(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="Times">
                                        Times
                                    </MenuItem>
                                    <MenuItem value="mins">Mins</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 130 }}>
                                <Select
                                    value={tempSelectedGoal}
                                    onChange={(e) => setTempSelectedGoal(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="Per day">
                                        Per day
                                    </MenuItem>
                                    <MenuItem value="Per week">Per week</MenuItem>
                                    <MenuItem value="Per month">Per month</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                );
            } else {
            return null;
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 150, height: 140, margin: 'auto', backgroundColor: '#ffffff', marginTop: '30px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <CardActionArea onClick={handleCardClick} sx={{ cursor: 'pointer', height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <div style={{ backgroundColor: '#f3e7ff', padding: '6px', borderRadius: '50%', width: 'fit-content', margin: 'auto' }}>
                            <FaPlus style={{ fontSize: '3rem', margin: 'auto', color: '#5a00ec' }} />
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
                    <Typography variant="subtitle1" sx={{ marginBottom: '8px', marginLeft: '3px' }}>
                        Name
                    </Typography>
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
                    {renderGoalSection()}
                    {(selectedHabit !== 2 && selectedHabit !== 3 && selectedHabit !== 4) ? <div style={{ height: '10px' }} /> : null}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleCloseDialog} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddHabit}
                            variant="contained"
                            color="primary"
                            disabled={
                                selectedHabit === '' ||
                                ((selectedHabit === 2 || selectedHabit === 3 || selectedHabit === 4) &&
                                    (!tempSelectedValue || !tempSelectedUnit || !tempSelectedGoal))
                            }
                        >
                            Add Habit
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

AddHabitCard.propTypes = {
    addUserHabit: PropTypes.func.isRequired,
};

export default AddHabitCard;
