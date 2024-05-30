import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ReportCard({ data }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{data.day || data.week}</Typography>
                <Typography color="textSecondary">{data.habit}</Typography>
                <Typography color="textSecondary">{data.status}</Typography>
            </CardContent>
        </Card>
    );
}

export default ReportCard;
