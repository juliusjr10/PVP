import * as React from 'react';
import Box from '@mui/material/Box';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import ChallengesList from "../components/ChallengeList"
export default function Challenges() {
    return (
        <Box component="main" sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <CssBaseline />    
            <Sidebar />
            <ChallengesList/>
        </Box>
    );
}