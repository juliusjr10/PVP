import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function MyStopwatch() {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });


    return (
        <Box style={{ textAlign: 'center' }}>
            <Box style={{ fontSize: '25px' }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </Box>
            <Typography>{isRunning ? 'Running' : 'Not running'}</Typography>
            <Button onClick={start}>Start</Button>
            <Button onClick={pause}>Pause</Button>
            <Button onClick={reset}>Reset</Button>
        </Box>
    );
}

export default function App() {
    return (
        <Box>
            <MyStopwatch />
        </Box>
    );
}