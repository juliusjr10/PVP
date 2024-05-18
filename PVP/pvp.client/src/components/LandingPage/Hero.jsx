import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ReplyIcon from '@mui/icons-material/Reply';
import './Hero.css';

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

function Hero() {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={{
                    backgroundColor: '#FFFFFF',
                    mt: { xs: 20, sm: 10 },
                    mb: { xs: 30, sm: 10 },
                    height: { xs: 300, sm: 400 },
                    width: '80%',
                    borderRadius: '10px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h1" sx={{
                        fontWeight: 'bold',
                        fontSize: {
                            xl: '120px',
                            lg: '120px',
                            md: '100px',
                            sm: '100px',
                            xs: '50px'
                        },
                    }}>
                        Habit
                    </Typography>
                    <Typography variant="h1" sx={{
                        fontWeight: 'bold',
                        color: '#5a00ec',
                        fontSize: {
                            xl: '120px',
                            lg: '120px',
                            md: '100px',
                            sm: '100px',
                            xs: '50px'
                        },
                    }}>
                        Book
                    </Typography>
                </Box>

                <Box
                    sx={{
                        fontStyle: 'italic',
                        fontSize: {
                            xl: '30px',
                            lg: '30px',
                            md: '30px',
                            sm: '30px',
                            xs: '20px'
                        },
                        display: 'flex',
                    }}
                >
                    <Typography variant="h4" className='bubbleHover' sx={{ marginLeft: '8px' }}>
                        Track,
                    </Typography>
                    <Typography variant="h4" className='bubbleHover' sx={{ marginLeft: '8px' }}>
                        Share,
                    </Typography>
                    <Typography variant="h4" className='bubbleHover' sx={{ marginLeft: '8px' }}>
                        Grow:
                    </Typography>
                </Box>
                <Typography variant="h4" className='bubbleBreathing' sx={{
                    fontSize: {
                        xl: '35px',
                        lg: '35px',
                        md: '35px',
                        sm: '35px',
                        xs: '20px'
                    },
                    marginTop: '15px'
                }}>
                    Achieve Your goals <u><b>together!</b></u>
                </Typography>
                <Box alignItems="center" marginTop="30px" display='flex' marginLeft='14%'>
                    <Button
                        variant="contained"
                        onClick={() => scrollToSection('aboutUsSection')}
                        sx={{
                            width: '200px',
                            height: '50px',
                            borderRadius: '20px',
                            fontSize: '18px',
                            textTransform: 'none',
                            display: {
                                xs: 'none',
                                sm: 'flex',
                                md: 'flex',
                                lg: 'flex',
                                xl: 'flex'
                            }
                        }}
                    >
                        About
                    </Button>
                    <ReplyIcon sx={{
                        display: {
                            xs: 'none',
                            sm: 'flex',
                            md: 'flex',
                            lg: 'flex',
                            xl: 'flex'
                        },
                        marginLeft: '10px',
                    }}
                    />
                    <Typography variant="h4" sx={{
                        fontSize: '16px',
                        transform: 'rotate(-30deg)',
                        display: {
                            xs: 'none',
                            sm: 'inline-block',
                            md: 'inline-block',
                            lg: 'inline-block',
                            xl: 'inline-block'
                        },
                    }}>
                        Learn more
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Hero;