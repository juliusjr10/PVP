import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import { Link } from 'react-router-dom';

export default function ActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea component={Link} to={'/smokinghabit'}>
                <CardContent>
                    <SmokeFreeIcon style={{ fontSize: '250px' }}></SmokeFreeIcon>
                    <Typography gutterBottom variant="h5" component="div">
                        Smoking
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}