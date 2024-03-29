import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Calendar from './Calendar';
import Sidebar from "./Sidebar";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';

const CalendarContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(25),
    right: theme.spacing(6),
}));

const CheckInContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(65),
    right: theme.spacing(6),
}));

const TitleContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(10),
    right: theme.spacing(1),
}));

export default function SmokingHabit() {
    const [checkIns, setCheckIns] = useState([]);
    const [selectedMood, setSelectedMood] = useState(0); // State to hold the selected mood
    const [note, setNote] = useState(''); // State to hold the note

    useEffect(() => {
        const fetchCheckIns = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/Habits/getuserhabitcheckins/3', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch check-in data');
                }
                const data = await response.json();
                const checkInsArray = data && data['$values'] ? data['$values'] : [];
                setCheckIns(checkInsArray);
            } catch (error) {
                console.error('Error fetching check-in data:', error);
            }
        };

        fetchCheckIns();
    }, []);

    const checkedDates = checkIns.map(checkIn => {
        const parsedDate = new Date(checkIn.date);
        return {
            date: format(parsedDate, 'yyyy-MM-dd'),
            mood: checkIn.mood // Assuming `checkIn` object contains mood property
        };
    }) ?? [];

    const handleCheckDate = async (date, mood, note) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        if (checkedDates.includes(formattedDate)) {
            console.log('Already checked in on this date');
            return;
        }

        try {
            const response = await fetch('https://localhost:7200/api/habits/checkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    HabitId: 3,
                    Mood: mood,
                    Date: date,
                    Note: note
                })
            });

            if (!response.ok) {
                throw new Error('Failed to check in');
            }

            const updatedCheckIn = await response.json();
            setCheckIns(prevCheckIns => [...prevCheckIns, updatedCheckIn]);
        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    const handleCheckCurrentDate = async () => {
        const currentDate = new Date(); // Get the current date and time
        handleCheckDate(currentDate, selectedMood, note); // Pass the note to the function
    };

    const handleMoodChange = event => {
        setSelectedMood(event.target.value); // Update selected mood when it changes
    };

    const handleNoteChange = event => {
        setNote(event.target.value); // Update note when it changes
    };

    return (
        <div style={{ display: 'flex', backgroundColor: "#A8D0E6", width: '100%' }}>
            <CssBaseline />
            <Sidebar />
            <div style={{ padding: '16px' }}>
                <TitleContainer>
                    <Box sx={{
                        textAlign: 'center',
                        marginBottom: '16px',
                        padding: '8px',
                        border: '2px solid #CCCCCC',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08)',
                        background: '#F0F0F0',
                        width: '500px',
                        height: '80px',
                    }}>
                        <Typography variant="h5" component="div" gutterBottom sx={{ fontSize: '2rem', color: '#333333' }}>
                            Water Habit Progress
                        </Typography>
                    </Box>
                </TitleContainer>
                <CheckInContainer>
                    <div style={{ padding: '16px' }}>
                        <TextareaAutosize
                            value={note}
                            onChange={handleNoteChange}
                            placeholder="Write your note here..."
                            style={{
                                width: '300px',
                                height: '150px', // Adjust the height as needed
                                padding: '8px',
                                borderRadius: '4px',
                                marginBottom: '16px',
                            }}
                        />
                    </div>
                    <Select
                        value={selectedMood}
                        onChange={handleMoodChange}
                        style={{ width: '115px', marginBottom: '16px' }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: '200px',
                                    width: '300px', // adjust the width as needed
                                },
                            },
                        }}
                    >
                        <MenuItem value={0} style={{ color: '#FF0000' }}>Awful</MenuItem>
                        <MenuItem value={1} style={{ color: '#FFA500' }}>Bad</MenuItem>
                        <MenuItem value={2} style={{ color: '#FFFF00' }}>Meh</MenuItem>
                        <MenuItem value={3} style={{ color: '#00FF00' }}>Good</MenuItem>
                        <MenuItem value={4} style={{ color: '#008000' }}>Excellent</MenuItem>
                    </Select>
                    <Button onClick={handleCheckCurrentDate} variant="contained" style={{ marginLeft: '32px' }}>
                        Check Current Date
                    </Button>
                </CheckInContainer>
                <CalendarContainer>
                    <Calendar checkedDates={checkedDates} onCheckDate={handleCheckDate} />
                </CalendarContainer>
            </div>
        </div>
    );
}
