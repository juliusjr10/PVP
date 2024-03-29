import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import Icon from "../assets/meditation.png";

export default function MeditationCard({ onClick, expanded }) {
    return (
        <Card sx={{ maxWidth: 200, margin: 'auto', bgcolor: expanded ? '#3c506e' : '#5F77A6' }}>
            <CardActionArea onClick={onClick} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#3c506e' } }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <img src={Icon} alt="Meditation Icon" style={{ width: '150px', margin: 'auto' }} />
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                        Meditation
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
MeditationCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
};