import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SmokingCard from '../components/SmokingCard';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));





export default function HabitsPage() {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline /> 
            <Sidebar/>
            <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                <DrawerHeader />
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