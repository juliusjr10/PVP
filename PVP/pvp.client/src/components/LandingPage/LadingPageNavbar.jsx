import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../../assets/logo-white.svg";

function NavBar({ pages }) {

    // Filter out the "About" button from the pages array
    const filteredPages = pages.filter(page => page.label !== 'About');

    return (
        <Toolbar
            variant="regular"
            sx={{
                bgcolor: '#5a00ec',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                px: 0,
                justifyContent: 'space-between',
                flexGrow: 1,
            }}
        >
            <Link to="/landingpage" style={{ width: '100px' }}>
                <img src={Logo} alt="Logo" />
            </Link>
            <Box sx={{ display: 'flex' }}>
                {filteredPages.map((page, index) => (
                    <Link key={index} to={page.link} style={{ textDecoration: 'none' }}>
                        <MenuItem sx={{ py: '6px', px: '12px' }}>
                            <Typography variant="body1" color="#FFFFFF" sx={{ fontSize: '18px' }}>
                                {page.label}
                            </Typography>
                        </MenuItem>
                    </Link>
                ))}
            </Box>
        </Toolbar>
    );
}

NavBar.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
    })).isRequired,
};

export default NavBar;