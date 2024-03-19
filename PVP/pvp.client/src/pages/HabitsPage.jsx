import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SmokingCard from '../components/SmokingCard';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import SmokingHabit from './SmokingHabit';

export default function HabitsPage() {


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <SmokingCard></SmokingCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SmokingCard></SmokingCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SmokingCard></SmokingCard>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
