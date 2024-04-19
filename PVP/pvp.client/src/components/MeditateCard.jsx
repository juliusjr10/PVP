import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import { GiMeditation } from "react-icons/gi";
import { differenceInDays } from 'date-fns';

export default function MeditationCard({ onClick }) {

    return (
        <Card sx={{ maxWidth: 200, height: 200, margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardActionArea onClick={onClick} sx={{ cursor: 'pointer', height: 200 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#f3e7ff', padding: '8px', borderRadius: '50%', width: 'fit-content', margin: 'auto' }}>
                        <GiMeditation style={{ fontSize: '6rem', margin: 'auto', color: '#5a00ec' }} /> {/* Adjust fontSize here */}
                    </div>
                    <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px' }}>
                        Meditation
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}