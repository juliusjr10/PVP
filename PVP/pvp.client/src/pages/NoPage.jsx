import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Error404() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center', // Centruojame turinį horizontaliai
            }}
        >
            <Typography variant="h1">Error 404</Typography>
        </Box>
    );
}

export default Error404;
