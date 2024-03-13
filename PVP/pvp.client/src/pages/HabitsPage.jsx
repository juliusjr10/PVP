import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SmokingCard from '../components/SmokingCard';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import SmokingHabit from './SmokingHabit';

export default function HabitsPage() {
    const [selectedCard, setSelectedCard] = React.useState(null);

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId === selectedCard ? null : cardId);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <SmokingCard onClick={() => handleCardClick(1)} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <SmokingCard onClick={() => handleCardClick(2)} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <SmokingCard onClick={() => handleCardClick(3)} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {selectedCard ? ( // Render SmokingHabit component if a card is selected
                        <Grid item xs={12} md={4}>
                            <SmokingHabit />
                        </Grid>
                    ) : null}
                </Grid>
            </Box>
        </Box>
    );
}