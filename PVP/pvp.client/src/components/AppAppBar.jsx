import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../assets/logo-white.png";


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
                <Container disableGutters maxWidth={false}
                >
                    <Toolbar
                        variant="regular"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '0px',
                            bgcolor: '#24305E',
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
                            <Link to="/landingpage"> 
                                <img src={Logo} alt="Logo" style={{ width: '90px' }} />
                            </Link>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page, index) => (
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
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
                                        
                                    </Box>
                                    <MenuItem onClick={() => scrollToSection('features')}>
                                        About
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('testimonials')}>
                                        Sign in
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('highlights')}>
                                        Sign up
                                    </MenuItem>
                                    <Divider />
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AppAppBar;