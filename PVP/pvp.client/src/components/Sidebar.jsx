import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppBar from '@mui/material/AppBar';
import logo from '../assets/logo-white.svg';
import ToggleDarkMode from './ToggleDarkMode';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
const drawerWidth = 240;

export default function ClippedDrawer() {
    const [activePage, setActivePage] = React.useState('');
    const location = useLocation();
    const [username, setUsername] = React.useState('');
    React.useEffect(() => {
        setActivePage(location.pathname);
    }, [location]);

    const handleItemClick = (link) => {
        setActivePage(link);
    };

    const handleLogout = async () => {
        await fetch('https://localhost:7200/api/Auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        window.location.href = '/landingpage';
    };

    React.useEffect(() => {
        setActivePage(location.pathname);
    }, [location]);

    React.useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/Auth/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
                setUsername(content.username);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUsername();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    backgroundColor: 'black',
                }}
            >
                <Toolbar sx={{ justifyContent: 'right', bgcolor: '#24305E' }}>
                    <div /> {/* Empty div for spacing */}
                   {/* <img className="object-cover h-14 w-28" src={logo} alt="Logo" />*/}
                    <Avatar alt={username} src="../assets/react.svg"></Avatar>
                    <Link to='/editprofile'><Typography sx={{ m: 1 }}>{username}</Typography></Link>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#24305E',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <Box sx={{ justifyContent: 'right', pl: 3 }}>
                        <img className="object-cover h-14 w-28" src={logo} alt="Logo" />
                    </Box>
                        {/*<Avatar alt={username} src="../assets/react.svg"></Avatar>*/}
                        {/*<Link to='/editprofile'><Typography sx={{ m: 1 }}>{username}</Typography></Link>*/}
                    
                </Toolbar>
                <Divider />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                        { text: 'Habits', link: '/habitspage', icon: <StarIcon /> },
                        { text: 'Groups', link: '/groupspage', icon: <GroupsIcon /> }].map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ display: 'block', color: 'white' }}>
                                <ListItemButton
                                    component={Link}
                                    to={item.link}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: 'center',
                                        px: 2.5,
                                        borderRadius: 1,
                                        padding: -10,
                                        backgroundColor: activePage === item.link ? '#5F77A6' : 'inherit',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: activePage !== item.link ? 'rgba(0, 0, 0, 0.08)' : '#5F77A6',
                                            color: '#bfbfbf',
                                        },
                                    }}
                                    onClick={() => handleItemClick(item.link)}
                                >
                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {[
                            { text: 'Logout', icon: <ExitToAppIcon /> }].map((item) => (
                                <ListItem key={item.text} disablePadding sx={{
                                    color: 'white',
                                    '&:hover': {
                                        color: '#bfbfbf',
                                    }
                                }}>
                                    <ListItemButton
                                        onClick={handleLogout}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: 'center',
                                            px: 2.5,
                                            borderRadius: 1,
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: activePage !== item.link ? 'rgba(0, 0, 0, 0.08)' : '#5F77A6',
                                                color: '#bfbfbf',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'inherit' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}