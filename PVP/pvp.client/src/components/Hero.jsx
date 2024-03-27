import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReplyIcon from '@mui/icons-material/Reply';


const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
        const targetScroll = sectionElement.offsetTop - offset;
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
        });
    }
};

export default function Hero() {
    return (
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 8, sm: 14 },
                    pb: { xs: 2, sm: 4 },
                }}
            >
                <Box
                    sx={(theme) => ({
                        mt: { xs: 8, sm: 10 },
                        alignSelf: 'center',
                        height: { xs: 200, sm: 400 },
                        width: '80%',
                        backgroundColor: 'rgba(247, 108, 108, 1)',
                        backgroundSize: 'cover',
                        borderRadius: '10px',
                        outline: '1px solid',
                        alignItems: 'center',
                        outlineColor:
                            theme.palette.mode === 'light'
                                ? alpha('#BFCCD9', 0.5)
                                : alpha('#9CCCFC', 0.1),
                       boxShadow: `0 0 24px 12px ${alpha('#033363', 0.2)}`,
                        display: 'flex', 
                        justifyContent: 'center', 
                        flexDirection: 'column', 
                        textAlign: 'center', 
                    })}
            >
                <Typography variant="h1" sx={{ color: '#ffffff' }}>
                    HabitBook
                </Typography>
                <Typography variant="h4" sx={{ color: '#ffffff' }}>
                    Track, Share, Grow:
                </Typography>
                <Typography variant="h4" sx={{ color: '#ffffff' }}>
                    Achieve Your Goals Together
                </Typography>
                <Grid container spacing={2} alignItems="center" marginTop="60px" paddingLeft="38%">
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => scrollToSection('aboutUsSection')}
                            sx={{
                                width: '200px',
                                height: '50px',
                                backgroundColor: '#f8e9a1',
                                color: '#000000',
                                borderRadius: '20px',
                                fontSize: '18px',
                                textTransform: 'none',
                               
                                '&:hover': {
                                    backgroundColor: '#f7e174',
                                },
                            }}
                        >
                            About
                        </Button>
                    </Grid>
                    <Grid item>
                        <ReplyIcon
                            sx={{
                                color: 'white',
                            }}
                        />
                        <Typography variant="h4" sx={{
                            color: '#ffffff', fontFamily: 'Arial', fontSize: '16px', transform: 'rotate(-30deg)',
                            display: 'inline-block', }}>
                            Learn more
                        </Typography>
                    </Grid>
                </Grid>
                </Box>
            </Container>
    );
}