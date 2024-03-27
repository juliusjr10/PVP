import React, { useState, useEffect } from 'react';
import { styled} from '@mui/material/styles';
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
        return format(parsedDate, 'yyyy-MM-dd');
    }) ?? [];


    const handleCheckDate = async date => {
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
                    Mood: 0,
                    Date: date,
                    Note: 'string'
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

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <Box>
                <CalendarContainer>
                    <Calendar checkedDates={checkedDates} onCheckDate={handleCheckDate} />
                </CalendarContainer>
            </Box>
        </Box>
    );
}