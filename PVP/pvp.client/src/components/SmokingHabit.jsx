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

const SmokingHabitContainer = styled(Box)({
    position: 'fixed',
    top: 50,
    right: 0,
    height: '100%',
    width: '600px',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(100%) scaleX(1.5)',
    zIndex: 999,
});

const StreakBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6F61',
    color: '#fff',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '16px',
    width: '500px',
    position: 'relative',
    "& div:first-child": {
        fontSize: '0.8rem',
        fontStyle: 'italic',
        color: '#888',
    },
    "&::before": {
        content: "'🔥'",
        position: 'absolute',
        top: '50%',
        left: '10%',
        transform: 'translateY(-50%)',
        fontSize: '1.5rem',
    }
});

const CheckInBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#455A64',
    color: '#fff',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '16px',
    width: '150px',
    position: 'relative',
    "& div:first-child": {
        fontSize: '0.8rem',
        fontStyle: 'italic',
        color: '#888',
    },
});

const CheckInWrapper = styled(Box)({
    display: 'flex',
    marginBottom: '16px',
});

const CheckInBoxWithoutCheckIns = styled(CheckInBox)({
    marginLeft: '200px',
});

const Popup = styled('div')`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    width: 300px;
    padding: 20px;
    border-radius: 8px;
    z-index: 1000;
`;

const PopupContent = styled('div')`
    text-align: center;
`;

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

    const streakDays = () => {
        let streak = 0;
        const reversedCheckIns = [...checkIns].reverse();
        for (let i = 0; i < reversedCheckIns.length; i++) {
            const currentDate = new Date();
            const checkInDate = new Date(reversedCheckIns[i].date);
            if (differenceInDays(currentDate, checkInDate) === streak) {
                streak++;
            } else {
                break;
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
        <SmokingHabitContainer style={{ transform: isVisible ? 'translateX(0)' : 'translateX(100%)' }}>
            <div style={{ padding: '16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '16px', padding: '8px', border: '2px solid #CCCCCC', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08)', background: '#F0F0F0', width: '500px', height: '80px' }}>
                    <Typography variant="h5" component="div" gutterBottom sx={{ fontSize: '2rem', color: '#333333' }}>
                        Stop Smoking
                    </Typography>
                </div>
                <StreakBox>
                    <div>Current Streak</div>
                    <div>{streakDays()} Day{streakDays() === 1 ? '' : 's'}</div>
                </StreakBox>
                <CheckInWrapper>
                    <CheckInBox>
                        <div>Success</div>
                        <div>{checkIns.length} Day{checkIns.length === 1 ? '' : 's'}</div>
                    </CheckInBox>
                    <CheckInBoxWithoutCheckIns>
                        <div>Days without Check-in</div>
                        <div>{daysWithoutCheckIn} Day{daysWithoutCheckIn === 1 ? '' : 's'}</div>
                    </CheckInBoxWithoutCheckIns>
                </CheckInWrapper>

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
                            <MenuItem value={0} style={{ color: '#FF0000' }}>Awful</MenuItem>
                            <MenuItem value={1} style={{ color: '#FFA500' }}>Bad</MenuItem>
                            <MenuItem value={2} style={{ color: '#FFFF00' }}>Meh</MenuItem>
                            <MenuItem value={3} style={{ color: '#00FF00' }}>Good</MenuItem>
                            <MenuItem value={4} style={{ color: '#008000' }}>Excellent</MenuItem>
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
                    onDateClick={handleDateClick} // Pass handleDateClick function
                />
            </div>
        </SmokingHabitContainer>
    );
}
