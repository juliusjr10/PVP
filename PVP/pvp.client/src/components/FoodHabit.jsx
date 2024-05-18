import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { format, differenceInDays } from 'date-fns';
import Typography from '@mui/material/Typography';
import MyCalendar from './Calendar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';



const SmokingHabitContainer = styled(Box)({
    position: 'fixed',
    top: 50,
    right: 0,
    height: '100%',
    maxWidth: 'md',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(100%) scaleX(1.5)',
    zIndex: 999,
});





export default function SmokingHabit() {
    const [isVisible, setIsVisible] = useState(false);
    const [checkIns, setCheckIns] = useState([]);
    const [selectedMood, setSelectedMood] = useState(0);
    const [note, setNote] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for showing popup
    const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const fetchCheckIns = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/Habits/getuserhabitcheckins/4', {
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

    const streakDays = () => {
        let streak = 0;
        const reversedCheckIns = [...checkIns].reverse();
        const currentDate = new Date();
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);

        if (reversedCheckIns.length > 0) {
            const firstCheckInDate = new Date(reversedCheckIns[0].date);
            if (firstCheckInDate.toDateString() === yesterday.toDateString()) {
                for (let i = 0; i < reversedCheckIns.length; i++) {
                    const checkInDate = new Date(reversedCheckIns[i].date);
                    const daysDifference = differenceInDays(yesterday, checkInDate);

                    if (daysDifference <= streak) {
                        streak = daysDifference === streak ? streak + 1 : streak;
                    } else {
                        break;
                    }
                }
            } else {
                for (let i = 0; i < reversedCheckIns.length; i++) {
                    const checkInDate = new Date(reversedCheckIns[i].date);
                    const daysDifference = differenceInDays(currentDate, checkInDate);

                    if (daysDifference <= streak) {
                        streak = daysDifference === streak ? streak + 1 : streak;
                    } else {
                        break;
                    }
                }
            }
        }

        return streak;
    };

    const checkedDates = checkIns.map(checkIn => {
        const parsedDate = new Date(checkIn.date);
        return {
            date: format(parsedDate, 'yyyy-MM-dd'),
            mood: checkIn.mood
        };
    }) ?? [];

    const handleCheckDate = async (date, mood, note) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        if (checkedDates.some(check => check.date === formattedDate)) {
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
                    HabitId: 4,
                    Mood: mood,
                    Date: formattedDate,
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
        handleCheckDate(selectedDate, selectedMood, note);
        setShowPopup(false); // Close the popup after checking in
    };

    const handleMoodChange = event => {
        setSelectedMood(event.target.value);
    };

    const handleNoteChange = event => {
        setNote(event.target.value);
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleDateClick = date => {
        const today = new Date();
        const isToday = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();

        if (isToday) {
            setSelectedDate(date);
            setShowPopup(true);
        }
    };


    const firstCheckInDate = checkIns.length > 0 ? new Date(checkIns[0].date) : null;
    const today = new Date();
    let daysWithoutCheckIn = 0;

    if (firstCheckInDate) {
        const startDate = new Date(firstCheckInDate.getFullYear(), firstCheckInDate.getMonth(), firstCheckInDate.getDate());
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        for (let d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
            const formattedDate = format(d, 'yyyy-MM-dd');
            const found = checkedDates.find(item => item.date === formattedDate);

            if (!found) {
                daysWithoutCheckIn++;
            }
        }
    }

    return (
        <SmokingHabitContainer style={{ transform: isVisible ? 'translateX(0)' : 'translateX(100%)', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ padding: '16px' }}>
                <Box sx={{
                    textAlign: 'center',
                    mt: '10px'
                }}>
                    <Typography variant="h5" gutterBottom sx={{ fontSize: '2rem', color: '#333333' }}>
                        Healthy Food
                    </Typography>
                    <Divider/>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#5a00ec',
                        padding: '8px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        mt: '10px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: '1rem', color: '#ffffff' }}>Current Streak</Typography>
                    <Box sx={{ mb: '8px' }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff' }}>
                        <LocalFireDepartmentIcon sx={{ color: '#FF6F61', fontSize: '2rem', verticalAlign: 'middle' }} />
                        {streakDays()}
                    </Typography>

                    <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#ffffff' }}>Day{streakDays() === 1 ? '' : 's'}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '16px',

                    }}
                >
                    <Box sx={{ textAlign: 'center', padding: '8px', margin: '8px', borderRadius: '10px', width: '50%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Typography variant="body1">Success  <CheckIcon /></Typography>
                        <Typography variant="body2" sx={{ color: '#66bb6a' }} >{checkIns.length} Day{checkIns.length === 1 ? '' : 's'}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', padding: '8px', margin: '8px', borderRadius: '10px', width: '50%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Typography variant="body1">Failed <ClearIcon /></Typography>
                        <Typography variant="body2" sx={{ color: '#f44336' }}>{daysWithoutCheckIn} Day{daysWithoutCheckIn === 1 ? '' : 's'}</Typography>
                    </Box>
                </Box>

                <Dialog open={showPopup} onClose={handleClosePopup}>
                    <DialogTitle>Check-In</DialogTitle>
                    <DialogContent>
                        <TextareaAutosize
                            value={note}
                            onChange={handleNoteChange}
                            placeholder="Write your note here..."
                            style={{
                                width: '100%',
                                marginBottom: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '8px',
                            }}
                        />
                        <Select value={selectedMood} onChange={handleMoodChange} style={{ width: '100%' }}>
                            <MenuItem value={0} style={{ color: '#f44336' }}>Awful</MenuItem>
                            <MenuItem value={1} style={{ color: '#e57373' }}>Bad</MenuItem>
                            <MenuItem value={2} style={{ color: '#f57c00' }}>Meh</MenuItem>
                            <MenuItem value={3} style={{ color: '#81c784' }}>Good</MenuItem>
                            <MenuItem value={4} style={{ color: '#388e3c' }}>Excellent</MenuItem>
                        </Select>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClosePopup}>Cancel</Button>
                        <Button onClick={handleCheckCurrentDate}>Check Current Date</Button>
                    </DialogActions>
                </Dialog>

                <MyCalendar
                    checkedDates={checkedDates}
                    onCheckDate={handleCheckDate}
                    onDateClick={handleDateClick}
                />
            </Box>
        </SmokingHabitContainer>
    );

}
