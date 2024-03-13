import * as React from 'react';
import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Sidebar from "../components/Sidebar";

export default function MainPage() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography paragraph>
                    Cia home page'as
                </Typography>
            </Box>
        </Box>
    );
}