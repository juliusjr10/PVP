import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import { LiaSmokingBanSolid } from "react-icons/lia";
import { differenceInDays } from 'date-fns';




export default function ActionAreaCard({ onClick}) {

    const [checkIns, setCheckIns] = useState([]);
    useEffect(() => {
        const fetchCheckIns = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/Habits/getuserhabitcheckins/1', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch check-in data');
                }
                const data = await response.json();
                const checkInsArray = data && data['$values'] ? data['$values'] : [];
                setCheckIns(checkInsArray);
            } catch (error) {
                console.error('Error fetching check-in data:', error);
            }
        };

        fetchCheckIns();
    }, []);

    const streakDays = () => {
        let streak = 0;
        const reversedCheckIns = [...checkIns].reverse();
        for (let i = 0; i < reversedCheckIns.length; i++) {
            const currentDate = new Date();
            const checkInDate = new Date(reversedCheckIns[i].date);
            if (differenceInDays(currentDate, checkInDate) === streak) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    };


    return (
        <Card sx={{ maxWidth: 200, maxHeight: 200, margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardActionArea onClick={onClick} sx={{ cursor: 'pointer', height: 200 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#f3e7ff', padding: '8px', borderRadius: '5%', width: 'fit-content', margin: 'auto' }}>
                        <LiaSmokingBanSolid style={{ fontSize: '6rem', color: '#5a00ec' }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        Smoking
                    </Typography>

                    <Typography sx={{ fontSize: '0.7rem' }}>
                        Streak: {streakDays()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

ActionAreaCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired
};
