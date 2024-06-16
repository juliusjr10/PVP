import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Paper, Divider } from '@mui/material';
import dayjs from 'dayjs';

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

function WeeklyReport() {
    const [userHabits, setUserHabits] = useState([]);
    const [selectedHabitData, setSelectedHabitData] = useState({});
    const [monthlyHabitData, setMonthlyHabitData] = useState({});

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

                    // Process the check-ins to calculate the past 7 days data
                    const processedData = processCheckIns(habitsWithNames, 0, 6, true);
                    setSelectedHabitData(processedData);

                    // Process the check-ins to calculate the past month data for 4 weeks
                    const monthlyData = {
                        week1: processCheckIns(habitsWithNames, 21, 27),
                        week2: processCheckIns(habitsWithNames, 14, 20),
                        week3: processCheckIns(habitsWithNames, 7, 13),
                        week4: processCheckIns(habitsWithNames, 0, 6),
                    };
                    setMonthlyHabitData(monthlyData);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching user habits:', error);
            }
        };

        fetchUserHabits();
    }, []);

    const processCheckIns = (habits, startDayOffset, endDayOffset, useDayNames = false) => {
        const today = dayjs();
        const dateRange = [...Array(endDayOffset - startDayOffset + 1).keys()].map(i => {
            const date = today.subtract(i + startDayOffset, 'day');
            return useDayNames ? date.format('dddd') : date.format('YYYY-MM-DD');
        });

        const processedData = {};
        habits.forEach(habit => {
            const habitName = habit.habitName;
            processedData[habitName] = {};

            dateRange.forEach(day => {
                processedData[habitName][day] = false;
            });

            habit.checkIns.$values.forEach(checkIn => {
                const checkInDate = dayjs(checkIn.date);
                const checkInKey = useDayNames ? checkInDate.format('dddd') : checkInDate.format('YYYY-MM-DD');
                if (dateRange.includes(checkInKey)) {
                    processedData[habitName][checkInKey] = true;
                }
            });
        });

        return processedData;
    };

    const calculatePercentage = (weekData, habit) => {
        if (!weekData || !weekData[habit]) return 0;
        const days = Object.keys(weekData[habit]);
        const checkedDaysCount = days.filter(day => weekData[habit][day]).length;
        return (checkedDaysCount / days.length) * 100;
    };

    const getBackgroundColor = (percentage) => {
        if (percentage < (3 / 7) * 100) return '#f44336';
        if (percentage < (6 / 7) * 100) return '#ff9800';
        return '#4caf50';
    };

    const weeks = [
        { week: "Week 1", data: monthlyHabitData.week1 },
        { week: "Week 2", data: monthlyHabitData.week2 },
        { week: "Week 3", data: monthlyHabitData.week3 },
        { week: "Week 4", data: monthlyHabitData.week4 },
    ];

    return (
        <Box sx={{ width: "80%", mt: '75px', mx: 'auto' }}>
            <Typography variant='h2' sx={{
                width: '100%',
                backgroundColor: '#ffffff',
                marginBottom: '25px',
                display: 'flex',
                justifyContent: 'center',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '5px',
                fontWeight: '600'
            }}>
                LAST WEEK REPORT
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Grid container spacing={2} justifyContent="center">
                    {selectedHabitData && userHabits.length > 0 ? (
                        userHabits.map(habit => (
                            <Grid item xs={12} key={habit.habitName}>
                                <Card
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                        minHeight: '150px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" align="center">
                                            {habit.habitName}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}
                                        >
                                            {selectedHabitData[habit.habitName] && Object.keys(selectedHabitData[habit.habitName]).map(day => (
                                                <Box
                                                    key={day}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        m: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2">{day}</Typography>
                                                    <Box
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            backgroundColor: selectedHabitData[habit.habitName][day] ? '#4caf50' : '#f44336',
                                                            marginTop: 1,
                                                        }}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6">No habits data available</Typography>
                    )}
                </Grid>
            </Paper>
            <Divider sx={{ my: 4, height: 2 }} />
            <Typography variant='h2' sx={{
                width: '100%',
                backgroundColor: '#ffffff',
                marginBottom: '25px',
                marginTop: '25px',
                display: 'flex',
                justifyContent: 'center',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '5px',
                fontWeight: '600'
            }}>
                LAST MONTH REPORT
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Grid container spacing={2} justifyContent="center">
                    {weeks.map((week) => (
                        <Grid item xs={12} key={week.week}>
                            <Card
                                sx={{
                                    backgroundColor: '#f5f5f5',
                                    minHeight: '150px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" align="center">
                                        {week.week}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        {userHabits.map(habit => {
                                            const habitName = habit.habitName;
                                            const percentage = week.data && week.data[habitName] ? calculatePercentage(week.data, habitName) : 0;
                                            const backgroundColor = getBackgroundColor(percentage);

                                            return (
                                                <Box
                                                    key={habitName}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        m: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2">{habitName}</Typography>
                                                    <Box
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            backgroundColor: backgroundColor,
                                                            marginTop: 1,
                                                        }}
                                                    />
                                                    <Typography variant="body2">{Math.round(percentage)}%</Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
}

export default WeeklyReport;
