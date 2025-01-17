import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import GroupSidebar from '../components/GroupSidebar';
import Avatar from '@mui/material/Avatar'; // Import Avatar component
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Container = styled(Box)({
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
});

const GroupsContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap', // Allow cards to wrap to the next row if necessary
    gap: '20px',
    width: '80%',
    maxWidth: '1200px', // Set maximum width to prevent cards from stretching too much
    margin: '0 auto', // Center the container horizontally
    minHeight: '300px', // Add a minimum height to maintain layout consistency
});

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[6],
    },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#7931EE', 0.15),
    '&:hover': {
        backgroundColor: alpha('#7931EE', 0.25),
    },
    marginLeft: 0,
    width: '30%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));

const PublicGroups = ({ publicGroups }) => {
    const [membershipMap, setMembershipMap] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

    useEffect(() => {
        const fetchMembershipStatus = async () => {
            if (publicGroups && publicGroups.length > 0) { // Add null check for publicGroups
                try {
                    const newMembershipMap = new Map();

                    const fetchStatus = publicGroups.map(async (group) => {
                        const response = await fetch('https://localhost:7200/api/group/isuseringroup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ groupId: group.groupID }),
                            credentials: 'include',
                        });

                        if (response.ok) {
                            try {
                                const text = await response.text();
                                if (text) {
                                    const isMember = JSON.parse(text);
                                    newMembershipMap.set(group.groupID, isMember);
                                } else {
                                    console.error('Empty response body');
                                }
                            } catch (error) {
                                console.error('Error parsing JSON:', error);
                            }
                        } else {
                            console.error('Error fetching membership status:', response.statusText);
                        }
                    });

                    await Promise.all(fetchStatus);
                    setMembershipMap(newMembershipMap);
                } catch (error) {
                    console.error('Error checking group membership:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                console.log("No groups available");
            }
        };

        fetchMembershipStatus();
    }, [publicGroups?.length]); // Add null check for publicGroups


    const handleJoinGroup = async (groupId) => {
        try {
            await fetch('https://localhost:7200/api/group/addgroupmember', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ GroupID: groupId }),
                credentials: 'include',
            });
            window.location.reload();
            setMembershipMap(new Map(membershipMap.set(groupId, true)));
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredGroups = publicGroups && publicGroups.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            {publicGroups && publicGroups.length > 0 ? (
                <>
                    <Typography variant="h4" gutterBottom align="center">
                        Public Groups
                    </Typography>
                    <Search sx={{ mb: 5 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery} // Bind the search query state
                            onChange={handleSearchChange} // Update search query state on change
                        />
                    </Search>
                    <GroupsContainer>
                        {filteredGroups.map((group) => (
                            <StyledCard key={group.groupID} sx={{ width: '100%' }}>
                                <StyledCardContent sx={{ display: 'flex' }}>
                                    <Avatar sx={{ width: 128, height: 128, marginRight: '16px' }} src={`https://picsum.photos/1920/1080?random`} /> {/* Group photo */}
                                    <Box sx={{ justifyContent: 'space-between', width: '100%' }}>
                                        <Box sx={{ float: 'left' }}>
                                            <Typography variant="h3">
                                                {group.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ margin: 'auto' }}>
                                                {group.description}
                                            </Typography>
                                        </Box>
                                        {!membershipMap.get(group.groupID) && (
                                            <StyledButton
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleJoinGroup(group.groupID)}
                                                sx={{ float: 'right' }}
                                            >
                                                Join Group
                                            </StyledButton>
                                        )}
                                    </Box>
                                </StyledCardContent>
                            </StyledCard>
                        ))}
                    </GroupsContainer>
                </>
            ) : (
                <Typography variant="h6" align="center">No Public Groups Available</Typography>
            )}
            <GroupSidebar onSelectGroup={setSelectedGroupId} /> {/* Pass the setter function as a prop */}
        </Container>
    );
};

PublicGroups.propTypes = {
    publicGroups: PropTypes.arrayOf(
        PropTypes.shape({
            groupID: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            adminUserID: PropTypes.number.isRequired,
            creationDate: PropTypes.string.isRequired,
            privacyLevel: PropTypes.oneOf([0, 1, 2]).isRequired,
        })
    )
};

export default PublicGroups;
