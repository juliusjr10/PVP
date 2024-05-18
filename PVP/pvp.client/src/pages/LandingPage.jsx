import * as React from 'react';
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
            <Hero />
            <AboutUs />
            <OurTeam />
            <Footer/>
        </Container>

    );
}