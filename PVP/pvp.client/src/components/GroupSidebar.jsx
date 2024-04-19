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

const Container = styled('div')({
    width: 240,
    height: '100%',
    backgroundColor: '#f0f0f0',
    position: 'fixed', // Position the sidebar fixedly
    top: 0, // Align the sidebar to the top of the screen
    right: 0, // Align the sidebar to the far right of the screen
    zIndex: 1000,
});

const Header = styled('div')({
    padding: '16px',
    borderBottom: '1px solid #ddd',
});

const SidebarContent = styled('div')({
    padding: '16px',
    marginTop: '35px',
});

const GroupSidebar = ({ onSelectGroup }) => {
    const [userGroups, setUserGroups] = React.useState([]);

    const handleGroupClick = (groupId) => {
        console.log("as pahandlinu ir krc sitas id:", groupId)
        onSelectGroup(groupId); // Pass the selected group ID to the parent component
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
            <Header />
            <Divider />
            <SidebarContent>
                <Typography variant="h6" gutterBottom>
                    My Groups
                </Typography>
                <List>
                    {userGroups.map((group) => (
                        <ListItem key={group.groupID} button onClick={() => handleGroupClick(group.groupID)}>
                            <ListItemText primary={group.name} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Button variant="contained" component={Link} to="/create-group" fullWidth>
                    Create New Group
                </Button>
                <Divider />
                <Button
                    variant="contained"
                    onClick={() => handleGroupClick(null)}
                    fullWidth
                    style={{ marginTop: '8px' }} // Add margin to the button
                >
                    Show Public Groups
                </Button>
            </SidebarContent>
        </Container>
    );
};
GroupSidebar.propTypes = {
    onSelectGroup: PropTypes.func,
};
export default GroupSidebar;
