import * as React from 'react';
import { useState } from 'react';
import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Calendar from '../components/Calendar';
import Sidebar from "../components/Sidebar";


const CalendarContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(9),
    right: theme.spacing(1),
}));
export default function SmokingHabit() {
    const [checkedDates, setCheckedDates] = useState([
        '2024-03-01',
        '2024-03-02',
        '2024-03-03',
        '2024-03-04',
        '2024-03-05',
        '2024-03-06',
        '2024-03-07',
        '2024-03-08',
    ]);
    const handleCheckDate = date => {
        const formattedDate = date.toISOString().split('T')[0];
        if (!checkedDates.includes(formattedDate)) {
            setCheckedDates(prevDates => [...prevDates, formattedDate]);
        } else {
            setCheckedDates(prevDates => prevDates.filter(d => d !== formattedDate));
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