import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import HabitBar from '../components/HabitBar';

export default function HabitsPage() {


    return (
        <Box sx={{ display: 'flex', bgcolor: "#A8D0E6", height: '120vh' }}>
            <CssBaseline />
            <Sidebar />
            <HabitBar/>
        </Box>
    );
}
