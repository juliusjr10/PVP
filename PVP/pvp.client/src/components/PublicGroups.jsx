import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const PublicGroups = ({ publicGroups }) => {
    const [membershipMap, setMembershipMap] = useState(new Map());

    useEffect(() => {
        if (publicGroups && publicGroups.length > 0) {
            const fetchMembershipStatus = async () => {
                try {
                    if (!publicGroups || publicGroups.length === 0) {
                        console.log("No groups available");
                        return;
                    }

                    const newMembershipMap = new Map();

                    // Iterate over each group and fetch membership status
                    for (const group of publicGroups) {
                        const groupId = group.groupID;
                        const response = await fetch('https://localhost:7200/api/group/isuseringroup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ groupId }),
                            credentials: 'include',
                        });

                        const isMember = await response.json();
                        newMembershipMap.set(groupId, isMember);
                    }

                    setMembershipMap(newMembershipMap);
                } catch (error) {
                    console.error('Error checking group membership:', error);
                }
            };

            fetchMembershipStatus();
        } else {
            console.log("No groups available");
        }
    }, [publicGroups]);

    const handleJoinGroup = async (groupId) => {
        try {
            await fetch('https://localhost:7200/api/group/addgroupmember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ GroupID: groupId }),
                credentials: 'include',
            });

            setMembershipMap(new Map(membershipMap.set(groupId, true)));
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    console.log('Rendering PublicGroups component');

    return (
        <Box marginTop={10}>
            {publicGroups && (
                <Typography variant="h6">Public Groups</Typography>
            )}
            {publicGroups && publicGroups.map(group => (
                <Card key={group.groupID} style={{ margin: '10px 0' }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {group.name}
                        </Typography>
                        <Typography variant="body1">
                            Description: {group.description}
                        </Typography>
                        {!membershipMap.get(group.groupID) && (
                            <Button variant="contained" color="primary" onClick={() => handleJoinGroup(group.groupID)}>
                                Join Group
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
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
