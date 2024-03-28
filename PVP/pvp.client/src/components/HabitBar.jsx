import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SmokingCard from '../components/SmokingCard';
import CssBaseline from '@mui/material/CssBaseline';
import SmokingHabit from '../pages/SmokingHabit';


export default function HabitBar() {
    const [expanded, setExpanded] = React.useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <SmokingCard onClick={toggleExpand} expanded={expanded} />
                    </Grid>
                    {expanded && (
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                                <SmokingHabit />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}