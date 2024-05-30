import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Paper, Divider } from '@mui/material';

function WeeklyReport() {
    const [week1Days] = useState({
        Monday: { Smoking: false, Meditation: true },
        Tuesday: { Smoking: false, Meditation: true },
        Wednesday: { Smoking: false, Meditation: true },
        Thursday: { Smoking: false, Meditation: true },
        Friday: { Smoking: false, Meditation: true },
        Saturday: { Smoking: true, Meditation: false },
        Sunday: { Smoking: true, Meditation: true },
    });

    const [week2Days] = useState({
        Monday: { Smoking: true, Meditation: false },
        Tuesday: { Smoking: false, Meditation: true },
        Wednesday: { Smoking: true, Meditation: true },
        Thursday: { Smoking: false, Meditation: false },
        Friday: { Smoking: true, Meditation: true },
        Saturday: { Smoking: false, Meditation: true },
        Sunday: { Smoking: false, Meditation: false },
    });

    const [week3Days] = useState({
        Monday: { Smoking: false, Meditation: false },
        Tuesday: { Smoking: false, Meditation: false },
        Wednesday: { Smoking: false, Meditation: false },
        Thursday: { Smoking: true, Meditation: false },
        Friday: { Smoking: true, Meditation: true },
        Saturday: { Smoking: false, Meditation: true },
        Sunday: { Smoking: true, Meditation: true },
    });

    const [week4Days] = useState({
        Monday: { Smoking: true, Meditation: true },
        Tuesday: { Smoking: true, Meditation: true },
        Wednesday: { Smoking: true, Meditation: true },
        Thursday: { Smoking: true, Meditation: true },
        Friday: { Smoking: true, Meditation: true },
        Saturday: { Smoking: false, Meditation: false },
        Sunday: { Smoking: false, Meditation: true },
    });

    const habits = ["Smoking", "Meditation"];

    const calculatePercentage = (weekData, habit) => {
        const days = Object.keys(weekData);
        const checkedDaysCount = days.filter(day => weekData[day][habit]).length;
        return (checkedDaysCount / days.length) * 100;
    };

    const getBackgroundColor = (percentage) => {
        if (percentage < (3 / 7) * 100) return '#f44336';
        if (percentage < (6 / 7) * 100) return '#ff9800';
        return '#4caf50';
    };

    const weeks = [
        { week: "Week 1", data: week1Days },
        { week: "Week 2", data: week2Days },
        { week: "Week 3", data: week3Days },
        { week: "Week 4", data: week4Days },
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
                WEEKLY REPORT
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Grid container spacing={2} justifyContent="center">
                    {Object.keys(week1Days).map((day) => (
                        <Grid item xs={1.5} key={day}>
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
                                        {day}
                                    </Typography>
                                    {habits.map((habit) => (
                                        <Box
                                            key={habit}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                mt: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    backgroundColor: week4Days[day][habit] ? '#4caf50' : '#f44336',
                                                    marginRight: 1,
                                                }}
                                            />
                                            <Typography variant="body2">{habit}</Typography>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
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
                MONTHLY REPORT
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Grid container spacing={2} justifyContent="center">
                    {weeks.map((week) => (
                        <Grid item xs={2.5} key={week.week}>
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
                                    {habits.map((habit) => {
                                        const percentage = calculatePercentage(week.data, habit);
                                        const backgroundColor = getBackgroundColor(percentage);

                                        return (
                                            <Box
                                                key={habit}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mt: 1,
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 20,
                                                        height: 20,
                                                        backgroundColor: backgroundColor,
                                                        marginRight: 1,
                                                    }}
                                                />
                                                <Typography variant="body2">{habit}: {Math.round(percentage)}%</Typography>
                                            </Box>
                                        );
                                    })}
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
