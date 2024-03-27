import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import { Container } from "@mui/material";
import '../landingpage.css';

export default function LandingPage() {

    return (
       
        <Container disableGutters maxWidth={false} sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#A8D0E6', }}>
            <AppAppBar>
            </AppAppBar>
            {/*<Box sx={{*/}
            {/*    bgcolor: '#A8D0E6',*/}
            {/*    height: '100vh',*/}
            {/*    position: 'relative',*/}
            {/*    overflow: 'hidden',*/}
            {/*}}>*/}
                <div className="circleblue"></div>
                <div className="circleblue2"></div>
                <div className="circleblue3"></div>
                <div className="circleblue4"></div>
                <div className="hero-container">
                    <Hero sx={{
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                    </Hero>
                </div>
            {/*</Box>*/}
            {/*<Box sx={{*/}
            {/*    bgcolor: '#A8D0E6',*/}
            {/*    height: '100vh',*/}
            {/*    position: 'relative',*/}
            {/*    overflow: 'hidden',*/}
            {/*}}>*/}
                <div className="circlered"></div>
                <div className="circlered2"></div>
                <div className="circlered3"></div>
                <div className="circlered4"></div>
                <div id="aboutUsSection" className="hero-container">
                <AboutUs sx={{
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                </AboutUs>
                </div>
           {/* </Box>*/}
            <Footer>
            </Footer>
        </Container>

    );
}