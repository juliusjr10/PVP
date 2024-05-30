import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import WeeklyReport from '../components/WeeklyReport';
import MonthlyReport from '../components/MonthlyReport';



export default function ReportsPage() {


    return (
        <Box component="main" sx={{ display: 'flex', minHeight: '100vh'}}>
            <CssBaseline />
            <Sidebar />
            <WeeklyReport />
        </Box>
    );
}
