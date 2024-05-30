// SingleGroup.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import GroupInformation from '../components/GroupInformation';
import Sidebar from '../components/Sidebar';

const SingleGroup = () => {
    let groupId;
    const [groupData, setGroupData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = window.location.href;
        const groupIdIndex = url.lastIndexOf('/') + 1;
        groupId = url.substring(groupIdIndex); // Assign value to groupId
        const fetchGroupData = async () => {
            try {
                const response = await fetch(`https://localhost:7200/api/group/${groupId}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error fetching group data: ${response.status} ${response.statusText} - ${errorText}`);
                }

                const data = await response.json();
                setGroupData(data);
            } catch (error) {
                console.error('Failed to fetch group data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupData();
    }, [groupId]);

    useEffect(() => {
        console.log("Group ID:", groupId); // Ensure that the groupId is correctly extracted
    }, [groupId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar onSelectGroup={(groupId) => console.log("Selected Group ID:", groupId)} />
            <Box sx={{ flex: 1, padding: '20px' }}>
                <Box sx={{ marginTop: '90px' }}>
                    {groupData ? (
                        <GroupInformation groupData={groupData} />
                    ) : (
                        <Typography variant="h6" align="center">
                            Group data not available
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );

};

export default SingleGroup;
