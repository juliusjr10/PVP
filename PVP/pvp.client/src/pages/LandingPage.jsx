import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import LogoCollection from '../components/LogoCollection';
import Highlights from '../components/Highlights';
import Pricing from '../components/Pricing';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import getLPTheme from '../getLPTheme';
import { createTheme, ThemeProvider, Container } from "@mui/material";

const theme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    "&.MuiContainer-maxWidthSm": {
                        paddingLeft: "0px",
                        paddingRight: "0px",
                    },
                },
            },
        },
    },
});

export default function LandingPage() {

    return (
         <ThemeProvider theme={theme}>
            <Container disableGutters maxWidth={false} >
            <CssBaseline />
            <AppAppBar />
            <Box sx={{ bgcolor: 'rgba(168, 208, 230, 1)' }}>
                <Hero />
                <Divider />
                <Footer />
            </Box>
        </Container>
    </ThemeProvider>
    );
}