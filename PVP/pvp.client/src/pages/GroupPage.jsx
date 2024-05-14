import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Sidebar from "../components/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import GroupSidebar from '../components/GroupSidebar';
import Groups from '../components/Groups';

export default function GroupPage() {
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    /*useEffect(() => {
        const savedGroupId = sessionStorage.getItem('selectedGroupId');
        console.log('Retrieved group ID from session storage:', savedGroupId);
        if (savedGroupId) {
            setSelectedGroupId(parseInt(savedGroupId));
        }
    }, []);*/

    return (
        <Box component="main">
            <CssBaseline />
            <Sidebar />
            <GroupSidebar onSelectGroup={setSelectedGroupId} /> {/* Pass the setter function as a prop */}
            <Groups selectedGroupId={selectedGroupId} /> {/* Pass the selected group ID as a prop */}
        </Box>
    );
}
