import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import ReportCard from './ReportCard';

const monthlyData = [
    { week: 'Week 1', habit: 'Exercise', status: '3/7 days' },
    { week: 'Week 2', habit: 'Read', status: '5/7 days' },
    // Add more data as needed
];

function MonthlyReport() {
    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Monthly Report
            </Typography>
            <Grid container spacing={2}>
                {monthlyData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ReportCard data={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default MonthlyReport;
