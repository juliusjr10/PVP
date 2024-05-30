import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem
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
    const [userGroups, setUserGroups] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [groupInfo, setGroupInfo] = useState({
        name: '',
        description: '',
        privacyLevel: 'InviteOnly', // Set default value to 'InviteOnly'
    });
    const navigate = useNavigate();

    const handleGroupClick = (groupId) => {
        onSelectGroup(groupId);
        navigate(`/groups/${groupId}`);
    };

    const handleCreateGroup = async () => {
        try {
            if (!groupInfo.name.trim() || !groupInfo.description.trim()) {
                alert('Please enter a group name and description.');
                return;
            }

            const userResponse = await fetch('https://localhost:7200/api/auth/user', {
                method: 'GET',
                credentials: 'include',
            });
            const userData = await userResponse.json();

            const groupData = {
                name: groupInfo.name,
                description: groupInfo.description,
                privacyLevel: 0,
                // Add other fields as needed
            };

            const response = await fetch('https://localhost:7200/api/group/creategroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData),
                credentials: 'include',
            });
            const createdGroup = await response.json();
            // Handle successful group creation
            console.log('Group created successfully:', createdGroup);
            setOpenDialog(false);

            // Add logic to handle the created group data as needed
        } catch (error) {
            console.error('Error creating group:', error);
        }
        window.location.reload();
    };




    const handleDialogClose = () => {
        setOpenDialog(false);
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
                    <Typography style={{ marginTop: "80px", paddingBottom: "30px" }} variant="h6">
                        My Groups
                    </Typography>
                    {userGroups.map((group) => (
                        <StyledListItem sx={{ backgroundColor: "#5a00ec", borderRadius: "5px", marginBottom: "20px" }} key={group.groupID} button onClick={() => handleGroupClick(group.groupID)}>
                            <ListItemText sx={{ color: "#ffffff" }} primary={group.name} />
                        </StyledListItem>
                    ))}
                </List>
            </SidebarContent>
            <Button variant="contained" style={{ marginBottom: "30px" }} onClick={() => setOpenDialog(true)} fullWidth>
                Create New Group
            </Button>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="group-name"
                        label="Group Name"
                        fullWidth
                        value={groupInfo.name}
                        onChange={(e) => setGroupInfo({ ...groupInfo, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="group-description"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={groupInfo.description}
                        onChange={(e) => setGroupInfo({ ...groupInfo, description: e.target.value })}
                    />
                    <TextField
                        select
                        margin="dense"
                        id="group-privacy-level"
                        label="Privacy Level"
                        fullWidth
                        value={groupInfo.privacyLevel}
                        onChange={(e) => setGroupInfo({ ...groupInfo, privacyLevel: e.target.value })}
                    >
                        <MenuItem value="InviteOnly">Invite Only</MenuItem>
                        <MenuItem value="Public">Public</MenuItem>
                        {/* Add more options as needed */}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleCreateGroup} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

GroupSidebar.propTypes = {
    onSelectGroup: PropTypes.func.isRequired,
};

export default GroupSidebar;
