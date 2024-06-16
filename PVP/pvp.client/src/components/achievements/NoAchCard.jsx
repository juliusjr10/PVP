import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import { LiaSmokingBanSolid } from "react-icons/lia";
import { HiMiniTrophy } from "react-icons/hi2";
import { differenceInDays } from 'date-fns';
import { PiMaskSadLight } from "react-icons/pi";




export default function ActionAreaCard() {

    return (
        <Card sx={{ maxWidth: 200, maxHeight: 200, margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardActionArea sx={{ cursor: 'pointer', height: 200 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#f3e7ff', padding: '8px', borderRadius: '100%', width: 'fit-content', margin: 'auto' }}>
                        <PiMaskSadLight style={{ fontSize: '6rem', color: '#5a00ec' }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        No achievements
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
