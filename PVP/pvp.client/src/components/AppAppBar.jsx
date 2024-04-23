import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../assets/logo-white.svg";

function AppAppBar({ pages }) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        if (sectionId) {
            const sectionElement = document.getElementById(sectionId);
            const offset = 128;
            if (sectionElement) {
                const targetScroll = sectionElement.offsetTop - offset;
                sectionElement.scrollIntoView({ behavior: 'smooth' });
                window.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth',
                });
                setOpen(false);
            }
        }
    };

    // Filter out the "About" button from the pages array
    const filteredPages = pages.filter(page => page.label !== 'About');

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    height: 150,
                    mt: 0,
                }}
            >
                <Container disableGutters maxWidth={false}>
                    <Toolbar
                        variant="regular"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '0px',
                            bgcolor: '#5a00ec',
                            height: 100,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                ml: '20px',
                                px: 0,
                            }}
                        >
                            <Link to="/landingpage" style={{ width: '100px' }} >
                                <img src={Logo} alt="Logo" />
                            </Link>
                            <Box sx={{ display: 'flex' }}>
                                {filteredPages.map((page, index) => (
                                    <Link key={index} to={page.link} style={{ textDecoration: 'none' }}>
                                        <MenuItem
                                            sx={{ py: '6px', px: '12px' }}
                                            onClick={() => scrollToSection(page.sectionId)}
                                        >
                                            <Typography variant="body1" color="#FFFFFF" sx={{ fontSize: '18px' }}>
                                                {page.label}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AppAppBar;