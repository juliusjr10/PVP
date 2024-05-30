import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const Container = styled(Box)({
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const GroupsContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
});

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s, box-shadow 0.3s',
    width: '300px',
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

const PublicGroups = ({ publicGroups }) => {
    const [membershipMap, setMembershipMap] = useState(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembershipStatus = async () => {
            if (publicGroups && publicGroups.length > 0) {
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
    }, [publicGroups]);

    const handleJoinGroup = async (groupId) => {
        try {
            await fetch('https://localhost:7200/api/group/addgroupmember', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ GroupID: groupId }),
                credentials: 'include',
            });

            setMembershipMap(new Map(membershipMap.set(groupId, true)));
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

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
                    <GroupsContainer>
                        {publicGroups.map((group) => (
                            <StyledCard key={group.groupID}>
                                <StyledCardContent>
                                    <Typography variant="h6" component="div">
                                        {group.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginBottom: 2 }}>
                                        {group.description}
                                    </Typography>
                                    {!membershipMap.get(group.groupID) && (
                                        <StyledButton
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleJoinGroup(group.groupID)}
                                        >
                                            Join Group
                                        </StyledButton>
                                    )}
                                </StyledCardContent>
                            </StyledCard>
                        ))}
                    </GroupsContainer>
                </>
            ) : (
                <Typography variant="h6" align="center">No Public Groups Available</Typography>
            )}
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
