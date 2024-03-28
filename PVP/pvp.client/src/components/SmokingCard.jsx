import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';

export default function ActionAreaCard({ onClick }) {
    return (
        <Card sx={{ maxWidth: 300, marginBottom: 2 }}> 
            <CardActionArea onClick={onClick} style={{ cursor: 'pointer' }}>
                <CardContent>
                    <SmokeFreeIcon style={{ fontSize: '100px', marginBottom: '10px' }} /> 
                    <Typography gutterBottom variant="h6" component="div"> 
                        Smoking
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

ActionAreaCard.propTypes = {
    onClick: PropTypes.func.isRequired,
};