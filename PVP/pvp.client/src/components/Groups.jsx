import * as React from 'react';
import PropTypes from 'prop-types';
import GroupInformation from '../components/GroupInformation';
import PublicGroups from '../components/PublicGroups';

const Groups = ({ selectedGroupId }) => {
    const [groupData, setGroupData] = React.useState(null);

    React.useEffect(() => {
        const fetchGroupData = async () => {
            try {
                let apiUrl = 'https://localhost:7200/api/group/'; // Default API endpoint for public groups

                if (selectedGroupId) {
                    apiUrl = `https://localhost:7200/api/group/${selectedGroupId}`; // Use group ID if selected
                }
                console.log('api url:', apiUrl)
                console.log('group ID:', selectedGroupId)
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    let groups = [];

                    // Check if the data is an array of group objects
                    if (Array.isArray(data.$values)) {
                        groups = data.$values;
                    } else if (data.groupID) {
                        // If not an array, but has a groupID property, treat it as a single group object
                        groups = [data];
                    }

                    console.log('Fetched group data:', groups); // Log fetched group data
                    setGroupData(groups);
                } else {
                    console.error('Failed to fetch group data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };

        fetchGroupData();
    }, [selectedGroupId]);

    return (
        
        <div>
            {/* Render group data based on whether selectedGroupId is provided */}
            {selectedGroupId ? (
                <GroupInformation groupData={groupData[0]} />
            ) : (
                <PublicGroups publicGroups={groupData} />
            )}
        </div>
    );
};

// PropTypes validation
Groups.propTypes = {
    selectedGroupId: PropTypes.number,
};


export default Groups;
