import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import GroupsIcon from '@mui/icons-material/Groups';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useLocation } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import AchIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));






export default function PersistentDrawerLeft() {
    const [activePage, setActivePage] = React.useState('');
    const location = useLocation();
    const [username, setUsername] = React.useState('');
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        HabitBook
                    </Typography>
                    <Typography variant="h6" noWrap component="div" sx={{ pl: 20, pr:20, color: '#F3E7FF', maxWidth: '1200px' }}>
                        <marquee direction="left" style={{ width: '100%', scrollamount:'10' }} >
                            <span>
                                Jessica Ennis-Hill: The only one who can tell you "you cannot win" is you and you do not have to listen.
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                Gertrude Ederle    : I just knew if it could be done, it had to be done, and I did it.
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                Jackie Joyner-Kersee: Age is no barrier. It is a limitation you put on your mind.
                            </span>
                            <span>
                                Ray Lewis: No matter the circumstances that you may be going through, just push through it.
                            </span>
                            <span>
                                Becky Sauerbrunn: The past does not matter. Take today.
                            </span>
                            <span>
                                Shannon Miller: There is always going to be a reason why you cannot do something; your job is to constantly look for the reasons why you can achieve your dreams.
                            </span>
                            <span>
                                Dwayne "The Rock" Johnson: If something stands between you and your success, move it. Never be denied.
                            </span>
                            <span>
                                Matt Biondi: Persistence can change failure into extraordinary achievement.
                            </span>
                            <span>
                                Frederick Douglass: If there is no struggle, there is no progress.
                            </span>
                            <span>
                                Nido Qubein: Change brings opportunity.
                            </span>
                            <span>
                                Deborah Day: Recognizing that you are not where you want to be is a starting point to begin changing your life.
                            </span>
                            <span>
                                Amanda Gorman: Change is made of choices, and choices are made of character.
                            </span>
                            <span>
                                George Bernard Shaw: Life is not about finding yourself. Life is about creating yourself.
                            </span>
                            <span>
                                Mahatma Gandhi: We must become the change we want to see.
                            </span>
                            <span>
                                Shakespeare: To climb steep hills requires a slow pace at first.
                            </span>
                        </marquee>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <Avatar alt={username} src="../assets/react.svg" />
                        <Link to='/editprofile'><Typography sx={{ ml: 1 , color:'white'}}>{username}</Typography></Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        { text: 'Habits', link: '/habitspage', icon: <StarIcon /> },
                        { text: 'Groups', link: '/groups', icon: <GroupsIcon /> },
                        { text: 'Friends', link: '/friends', icon: <PeopleIcon /> },
                        { text: 'Challenges', link: '/challenges', icon: <SportsScoreIcon />},
                        { text: 'Achievements', link: '/achievementspage', icon: <AchIcon /> }].map((item) => (
                            <ListItem key={item.text} disablePadding >
                                <ListItemButton
                                    component={Link}
                                    to={item.link}
                                    onClick={() => handleItemClick(item.link)}
                                >
                                    <ListItemIcon>
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
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}