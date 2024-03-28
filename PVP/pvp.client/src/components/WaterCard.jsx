import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import Icon from "../assets/water.png";

export default function ActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 200, margin: 'auto', bgcolor: '#5F77A6' }}>
            <CardActionArea component={Link} to={'/smokinghabit'} sx={{
                '&:hover': {
                    backgroundColor: '#3c506e',
                }
            }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <img src={Icon} alt="Logo" style={{ width: '150px', margin: 'auto' }} />
                    <Typography gutterBottom variant="h5" component="div" sx={{color: 'white'}}>
                        Water
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}