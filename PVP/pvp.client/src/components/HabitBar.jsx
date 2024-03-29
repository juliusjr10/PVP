import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import SmokingCard from '../components/SmokingCard';
import MeditateCard from '../components/MeditateCard';
import WaterCard from '../components/WaterCard';
import SmokingHabit from './SmokingHabit';
import MeditateHabit from './MeditateHabit';
import WaterHabit from './WaterHabit';

export default function HabitBar() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const toggleExpand = (cardType) => {
        setExpandedCard(expandedCard === cardType ? null : cardType);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <SmokingCard onClick={() => toggleExpand('smoking')} expanded={expandedCard === 'smoking'} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MeditateCard onClick={() => toggleExpand('meditation')} expanded={expandedCard === 'meditation'} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <WaterCard onClick={() => toggleExpand('water')} expanded={expandedCard === 'water'} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ p: 2, bgcolor: "#A8D0E6", flexGrow: 1 }}>
                {expandedCard === 'smoking' && <SmokingHabit />}
                {expandedCard === 'meditation' && <MeditateHabit />}
                {expandedCard === 'water' && <WaterHabit />}
            </Box>
        </Box>
    );
}
