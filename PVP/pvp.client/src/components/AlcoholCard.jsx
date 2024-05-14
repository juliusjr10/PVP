import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { LuWineOff } from "react-icons/lu";

export default function ActionAreaCard({ onClick }) {
    return (
        <Card sx={{ maxWidth: 200, maxHeight: 200, margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardActionArea onClick={onClick} sx={{ cursor: 'pointer', height: 200 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#f3e7ff', padding: '4px', borderRadius: '50%', width: 'fit-content', margin: 'auto' }}>
                        <LuWineOff style={{ fontSize: '6rem', color: '#5a00ec' }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px' }}>
                        Alcohol
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}