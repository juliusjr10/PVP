import * as React from 'react';
import Box from '@mui/material/Box';
import Hero from '../components/LandingPage/Hero';
import AboutUs from '../components/LandingPage/AboutUs';
import Footer from '../components/LandingPage/Footer';
import { Container } from "@mui/material";
import NavBar from '../components/LandingPage/LadingPageNavbar';
import OurTeam from '../components/LandingPage/OurTeam';

const allPages = [
    { label: 'About', link: '/landingpage', sectionId: 'aboutUsSection' },
    { label: 'Sign in', link: '/login', sectionId: null },
    { label: 'Sign up', link: '/signup', sectionId: null },
];


export default function LandingPage() {

    return (
       
        <Container disableGutters maxWidth={false} sx={{}}>
            <NavBar pages={allPages}/>
            <Hero/>
            <Box sx={{
                display: {
                    xs: 'none',
                    sm: 'flex',
                    md: 'flex',
                    lg: 'flex',
                    xl: 'flex'
                }
            }}>
                {/*<Box className="circleblue"></Box>*/}
                {/*<Box className="circleblue2"></Box>*/}
                {/*<Box className="circleblue3"></Box>*/}
                {/*<Box className="circleblue4"></Box>*/}
                {/*<Box className="circlered"></Box>*/}
                {/*<Box className="circlered2"></Box>*/}
                {/*<Box className="circlered3"></Box>*/}
                {/*<Box className="circlered4"></Box>*/}

            </Box>
            <AboutUs />
            <OurTeam />
            <Footer/>
        </Container>

    );
}