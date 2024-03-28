import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SmokingCard from '../components/SmokingCard';
import MeditateCard from '../components/MeditateCard';
import WaterCard from '../components/WaterCard';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import SmokingHabit from './SmokingHabit';

export default function HabitsPage() {


    return (
        <Box sx={{ display: 'flex', bgcolor: "#A8D0E6", height: '100vh' }}>
            <CssBaseline />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={3}>
                        <SmokingCard></SmokingCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MeditateCard></MeditateCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <WaterCard></WaterCard>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
