import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

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

const SidebarContent = styled('div')({
    padding: '16px',
    flexGrow: 1,
    overflowY: 'auto',
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
    const navigate = useNavigate();

    const handleGroupClick = (groupId) => {
        onSelectGroup(groupId);
        console.log("Selected Group:", groupId); // Print the selected group ID
        navigate(`/groups/${groupId}`);
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
        </Container>
    );
};

GroupSidebar.propTypes = {
    onSelectGroup: PropTypes.func.isRequired,
};

export default GroupSidebar;
