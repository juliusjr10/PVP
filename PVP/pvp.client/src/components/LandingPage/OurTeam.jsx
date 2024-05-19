import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfilePicMan from "../../assets/Profilepicman.svg";
import ProfilePicWoman from "../../assets/Profilepicwoman.svg";
import './Hero.css';

export default function OurTeam() {
    return (
        <Container  sx={{
            width: '70%',
            marginBottom: '150px'

        }}>

            <Typography variant="h2" marginBottom='50px' fontWeight='400' fontStyle='italic'><b>Our Team</b></Typography>
            <Box  sx={{
                margin: '0 auto',
                rowGap: '2%',
                columnGap: '4%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                marginBottom: '10px'
            }}>
                <Box className='bubbleHover' sx={{
                    width: '120px',
                    backgroundColor:'#FFFFFF' ,
                    padding: '5px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    marginBottom:'10px'
                }} >
                    <Typography><b>Tomas</b></Typography>
                    <img src={ProfilePicMan} alt="Track" />
                    <Typography>Full Stack</Typography>
                </Box>

                <Box className='bubbleHover' sx={{
                    width: '120px',
                    backgroundColor: '#FFFFFF',
                    padding: '5px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    marginBottom: '10px'
                }} >
                    <Typography><b>Julius</b></Typography>
                    <img src={ProfilePicMan} alt="Track" />
                    <Typography>Full Stack</Typography>
                </Box>

                <Box className='bubbleHover' sx={{
                    width: '120px',
                    backgroundColor: '#FFFFFF',
                    padding: '5px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    marginBottom: '10px'
                }} >
                    <Typography><b>Arminas</b></Typography>
                    <img src={ProfilePicMan} alt="Track" />
                    <Typography>Full Stack</Typography>
                </Box>
                <Box className='bubbleHover' sx={{
                    width: '120px',
                    backgroundColor: '#FFFFFF',
                    padding: '5px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    marginBottom: '10px'
                }} >
                    <Typography><b>Ailandas</b></Typography>
                    <img src={ProfilePicMan} alt="Track" />
                    <Typography>Full Stack</Typography>
                </Box>

                <Box className='bubbleHover' sx={{
                    width: '120px',
                    backgroundColor: '#FFFFFF',
                    padding: '5px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    marginBottom: '10px'
                }} >
                    <Typography><b>Deimantė</b></Typography>
                    <img src={ProfilePicWoman} alt="Track" />
                    <Typography>Front End</Typography>
                </Box>

                <Box className='bubbleHover' sx={{
                    width: '120px',
                    backgroundColor: '#FFFFFF',
                    padding: '5px',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    marginBottom: '10px'
                }} >
                    <Typography><b>Guoda</b></Typography>
                    <img src={ProfilePicWoman} alt="Track" />
                    <Typography>Front End</Typography>
                </Box>
            </Box>
        </Container>
    );
}