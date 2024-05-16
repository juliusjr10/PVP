import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const Container = styled('div')(({ theme }) => ({
    width: 280,
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    top: 0,
    right: 0,
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

const Header = styled('div')({
    padding: '16px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const SidebarContent = styled('div')({
    padding: '16px',
    flexGrow: 1,
    overflowY: 'auto',
});

const Footer = styled('div')({
    padding: '16px',
    borderTop: '1px solid #ddd',
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
    transition: 'background-color 0.3s, transform 0.3s',
    '&:hover': {
        backgroundColor: "#440e9c",
        transform: 'translateX(5px)',
    },
}));

const GroupSidebar = ({ onSelectGroup }) => {
    const [userGroups, setUserGroups] = React.useState([]);

    const handleGroupClick = (groupId) => {
        onSelectGroup(groupId);
    };

    React.useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const response = await fetch('https://localhost:7200/api/group/getusergroups', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data.$values)) {
                        setUserGroups(data.$values);
                    } else {
                        console.error('Data is not in the expected format:', data);
                    }
                } else {
                    console.error('Failed to fetch user groups:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user groups:', error);
            }
        };

        fetchUserGroups();
    }, []);

    return (
        <Container>
            <Header>
                <Typography variant="h6">
                    My Groups
                </Typography>
            </Header>
            <SidebarContent>
                <List>
                    <Typography variant="h6">
                        My Groups
                    </Typography>
                    {userGroups.map((group) => (
                        <StyledListItem sx={{ backgroundColor: "#5a00ec", borderRadius: "5px" }} key={group.groupID} button onClick={() => handleGroupClick(group.groupID)}>
                            <ListItemText sx={{ color: "#ffffff" }} primary={group.name} />
                        </StyledListItem>
                    ))}
                </List>
            </SidebarContent>
            <Footer>
                <Button variant="contained" component={Link} to="/create-group" fullWidth>
                    Create New Group
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleGroupClick(null)}
                    fullWidth
                    style={{ marginTop: '8px' }}
                >
                    Show Public Groups
                </Button>
            </Footer>
        </Container>
    );
};

GroupSidebar.propTypes = {
    onSelectGroup: PropTypes.func.isRequired,
};

export default GroupSidebar;
