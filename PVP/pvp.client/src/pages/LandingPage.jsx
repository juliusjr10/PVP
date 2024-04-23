import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import { Container } from "@mui/material";
import '../landingpage.css';

const allPages = [
    { label: 'About', link: '/landingpage', sectionId: 'aboutUsSection' },
    { label: 'Sign in', link: '/login', sectionId: null },
    { label: 'Sign up', link: '/signup', sectionId: null },
];

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

export default function LandingPage() {

    return (
       
        <Container disableGutters maxWidth={false} sx={{ position: 'relative', overflow: 'hidden' }}>
            <AppAppBar pages={allPages}>
            </AppAppBar>
            {/*<Box sx={{*/}
            {/*    bgcolor: '#A8D0E6',*/}
            {/*    height: '100vh',*/}
            {/*    position: 'relative',*/}
            {/*    overflow: 'hidden',*/}
            {/*}}>*/}

            <Box className="circleblue"></Box>
            <Box className="circleblue2"></Box>
            <Box className="circleblue3"></Box>
            <Box className="circleblue4"></Box>
            <Box className="hero-container">
                    <Hero sx={{
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                    </Hero>
                </Box>
            {/*</Box>*/}
            {/*<Box sx={{*/}
            {/*    bgcolor: '#A8D0E6',*/}
            {/*    height: '100vh',*/}
            {/*    position: 'relative',*/}
            {/*    overflow: 'hidden',*/}
            {/*}}>*/}
            <Box sx={{
                display: {
                    xs: 'none',
                    sm: 'flex',
                    md: 'flex',
                    lg: 'flex',
                    xl: 'flex'
                }
}}>
                <Box className="circlered"></Box>
                <Box className="circlered2"></Box>
                <Box className="circlered3"></Box>
                <Box className="circlered4"></Box>
            </Box>

            <Box id="aboutUsSection" className="hero-container">
                <AboutUs sx={{
                        position: 'relative',
                    overflow: 'hidden',
                    }}>
                </AboutUs>
                </Box>
           {/* </Box>*/}
            <Footer>
            </Footer>
        </Container>

    );
}