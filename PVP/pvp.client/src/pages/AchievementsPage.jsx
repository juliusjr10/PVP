import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import HabitBar from '../components/HabitBar';
import HabitsAchievements from '../components/HabitsAchievements';

export default function HabitsPage() {


    return (
        <Box component="main" sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <HabitsAchievements />
        </Box>
    );
}