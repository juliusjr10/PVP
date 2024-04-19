import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import { LiaSmokingBanSolid } from "react-icons/lia";
import { MdOutlineQuestionMark } from "react-icons/md";
import { differenceInDays } from 'date-fns';




export default function ActionAreaCard() {

    return (
        <Card sx={{ maxWidth: 200, maxHeight: 200, margin: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardActionArea sx={{ cursor: 'pointer', height: 200 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#f3e7ff', padding: '8px', borderRadius: '100%', width: 'fit-content', margin: 'auto' }}>
                        <MdOutlineQuestionMark style={{ fontSize: '6rem', color: '#5a00ec' }} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        ?????
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