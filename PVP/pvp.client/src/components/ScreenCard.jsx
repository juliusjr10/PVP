import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import { MdPhoneIphone, MdDelete } from 'react-icons/md'; // Importing the mobile phone and delete icons

export default function ScreenCard({ onClick, onDelete, habitId }) {
    return (
        <Card sx={{ maxWidth: 200, height: 200, margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardActionArea onClick={onClick} sx={{ cursor: 'pointer', height: 200 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                        onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation to prevent triggering onClick of CardActionArea
                            onDelete(habitId); // Call onDelete function when delete button is clicked
                        }}
                    >
                        <MdDelete />
                    </IconButton>
                    <div style={{ backgroundColor: '#f3e7ff', padding: '4px', borderRadius: '50%', width: 'fit-content', margin: 'auto' }}>
                        <MdPhoneIphone style={{ fontSize: '6rem', color: '#5a00ec' }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '20px' }}>
                        Sleep
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
