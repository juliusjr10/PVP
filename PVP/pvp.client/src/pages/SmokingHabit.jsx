// SmokingHabit.js

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Calendar from '../components/Calendar';
import Sidebar from "../components/Sidebar";
import { format } from 'date-fns';

const CalendarContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(9),
    right: theme.spacing(1),
}));

export default function SmokingHabit() {
    const [checkIns, setCheckIns] = useState([]);
    const [selectedMood, setSelectedMood] = useState(0); // State to hold the selected mood
    const [note, setNote] = useState(''); // State to hold the note

    useEffect(() => {
        const fetchCheckIns = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/Habits/getuserhabitcheckins/1', {
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
                    HabitId: 1,
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
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <Box>
                <textarea value={note} onChange={handleNoteChange} placeholder="Write your note here..." />
                <select value={selectedMood} onChange={handleMoodChange}>
                    <option value={0}>Awful</option>
                    <option value={1}>Bad</option>
                    <option value={2}>Meh</option>
                    <option value={3}>Good</option>
                    <option value={4}>Excellent</option>
                </select>
                <button onClick={handleCheckCurrentDate}>Check Current Date</button>
                <CalendarContainer>
                    <Calendar checkedDates={checkedDates} onCheckDate={handleCheckDate} />
                </CalendarContainer>
            </Box>
        </Box>
    );
}
