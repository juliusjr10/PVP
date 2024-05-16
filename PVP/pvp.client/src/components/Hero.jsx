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
                    sx={{
                        mt: { xs: 20, sm: 10 },
                        mb: { xs: 30, sm: 10 },
                        alignSelf: 'center',
                        height: { xs: 300, sm: 400 },
                        width: '80%',
                        backgroundColor: 'white',
                        backgroundSize: 'cover',
                        borderRadius: '10px',
                        alignItems: 'center',
                        boxShadow: `0 0 24px 12px ${alpha('#033363', 0.2)}`,
                        display: 'flex', 
                        justifyContent: 'center', 
                        flexDirection: 'column', 
                        textAlign: 'center', 
                    }}
            >
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
                    HabitBook
                </Typography>
                <Typography variant="h4" sx={{

                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    fontStyle: 'italic',
                    fontSize: {
                        xl: '30px',
                        lg: '30px',
                        md: '30px',
                        sm: '30px',
                        xs: '20px'
                    },

                }}>
                    Track, Share, Grow:
                </Typography>
                <Typography variant="h4" sx={{
                    fontSize: {
                        xl: '30px',
                        lg: '30px',
                        md: '30px',
                        sm: '30px',
                        xs: '20px'
                    },
                } }>
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
                    </Grid>
                    <Grid item>
                        <ReplyIcon sx={{
                            display: {
                                xs: 'none',
                                sm: 'flex',
                                md: 'flex',
                                lg: 'flex',
                                xl: 'flex'
                            }
                        } }
                        />
                        <Typography variant="h4" sx={{
                            fontFamily: 'Roboto', fontSize: '16px', transform: 'rotate(-30deg)',
                            display: {
                                xs: 'none',
                                sm: 'inline-block',
                                md: 'inline-block',
                                lg: 'inline-block',
                                xl: 'inline-block'},
                        }}>
                            Learn more
                        </Typography>
                    </Grid>
                </Grid>
                </Box>
            </Container>
    );
}