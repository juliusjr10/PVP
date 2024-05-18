import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Track from "../../assets/Healthy habit-bro.svg";
import Connect from "../../assets/Online-bro.svg";
import Challenge from "../../assets/Challenge.svg";
import './Hero.css';

export default function AboutUs() {
    return (

        <Container
            sx={{
                width: '50%',
                flexDirection: 'column',
                marginBottom: '100px',
                marginTop: '50px'
            }}
        >
            <Typography variant="h2" marginBottom='50px' fontWeight='400' fontStyle='italic'><b>About</b></Typography>
            <Box sx={{
                margin: '0 auto',
                rowGap: '20px',
                columnGap: '1.33%',
                display: 'grid',
                gridTemplateColumns:'repeat(auto-fill, 250px)',
                justifyContent: 'space-around',
                marginBottom: '10px'
            }}>
                <Box className='bubbleHover' sx={{
                    width: '250px',
                    height: '350px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',

                }}>
                    <Typography margin='10px' variant='h4'>TRACK</Typography>
                    <Box>
                        <img src={Track} alt="Track" />
                        <Typography marginBottom='10px'><u>Track</u> your habits!</Typography>
                    </Box>
                </Box>
                <Box className='bubbleHover' sx={{
                    width: '250px',  
                    height: '350px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                }}>
                    <Typography margin='10px' variant='h4'>CONNECT</Typography>
                    <Box>
                        <img src={Connect} alt="Connect" />
                        <Typography marginBottom='10px'><u>Connect</u> with people!</Typography>
                    </Box>
                </Box>
                <Box className='bubbleHover' sx={{
                    width: '250px',
                    height: '350px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                }}>
                    <Typography margin='10px' marginBottom='50px' variant='h4'>CHALLENGE</Typography>
                    <Box>
                        <img src={Challenge} alt="Challenge" />
                        <Typography marginBottom='10px' marginTop='43px'><u>Challenge</u> other people!</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}