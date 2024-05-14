import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MainFeaturedGroup from './MainFeaturedGroup';

const GroupInformation = ({ groupData }) => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [openConfirmation, setOpenConfirmation] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://localhost:7200/api/post/getallposts/${groupData.groupID}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();

                // Fetch user data for each post
                const postsWithUsers = await Promise.all(data.$values.map(async (post) => {
                    const userResponse = await fetch(`https://localhost:7200/api/auth/user/${post.userID}`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                    const userData = await userResponse.json();

                    return { ...post, user: userData }; // Combine post and user data
                }));
                console.log(postsWithUsers[0].user.name)
                setPosts(postsWithUsers);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [groupData.groupID]);

    const leaveGroup = async () => {
        try {
            const response = await fetch(`https://localhost:7200/api/group/leavegroup/${groupData.groupID}`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                // Handle success, maybe redirect or update UI
                console.log('Left the group successfully');
                window.location.reload();
            } else {
                // Handle failure
                console.error('Failed to leave the group');
            }
        } catch (error) {
            console.error('Error leaving the group:', error);
        }
    };

    const handleLeaveConfirmation = () => {
        setOpenConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };


    const handlePostSubmit = async () => {
        try {
            if (!newPostContent.trim()) {
                alert('Please enter a non-empty comment.');
                return;
            }
            // Fetch user data for the current user
            const userResponse = await fetch('https://localhost:7200/api/auth/user', {
                method: 'GET',
                credentials: 'include',
            });
            const userData = await userResponse.json();

            // Create the post object with user data
            const postData = {
                groupID: groupData.groupID,
                content: newPostContent,
                userID: userData.id, // Assuming the user ID is available in the user data
                user: userData // Include the entire user data for flexibility
            };

            // Send request to create the post
            const response = await fetch('https://localhost:7200/api/post/createpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
                credentials: 'include',
            });
            const createdPost = await response.json();

            // Update component state with new post
            setPosts([...posts, { ...createdPost, user: postData.user }]);

            // Clear the input field after submission
            setNewPostContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const mainFeaturedGroup = {
        title: groupData.name,
        description:
            groupData.description,
        image: 'https://source.unsplash.com/random?wallpapers',
        imageText: 'IMAGE TEXTAS',
    };

    return (
        <Box sx={{
            position: 'relative',
            top: -50,
            witdh: '100%'
        }}>
            <MainFeaturedGroup post={mainFeaturedGroup} />
            <Button onClick={handleLeaveConfirmation} variant="contained" style={{ backgroundColor: 'red', color: 'white', marginBottom: '10px', float: 'right', right: 250 }}>Leave Group</Button>
            {/*<Typography variant="h6">{groupData.name}</Typography>*/}
            <Grid container spacing={3} marginTop={2}>
                {/* Group description */}
                {/*<Grid item xs={6}>*/}
                {/*    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>*/}
                {/*        <Typography variant="body1"><strong>Description:</strong> {groupData.description}</Typography>*/}
                {/*        <Typography variant="body1"><strong>Creation Date:</strong> {new Date(groupData.creationDate).toLocaleDateString()}</Typography>*/}
                {/*        <Button onClick={handleLeaveConfirmation} variant="contained" style={{ backgroundColor: 'red', color: 'white', marginBottom: '10px' }}>Leave Group</Button>*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
                {/* Post feed */}
                <Grid item xs={6} style={{ marginLeft: '300px' }}>
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                        {/* Render post creation form */}
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            rows="4"
                            cols="40"
                            placeholder="Write your post here..."
                        />
                        <button onClick={handlePostSubmit}>Submit</button>
                        {/* Render posts in reverse order */}
                        {posts.slice().reverse().map((post) => (
                            <Paper key={post.postID} elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                                <Typography variant="body1"><strong>{post.user.name}</strong> </Typography>
                                <Typography variant="body1">{post.content}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(post.timestamp).toLocaleString()}
                                </Typography>
                            </Paper>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfirmation}
            >
                <DialogTitle>Leave Group</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to leave this group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={leaveGroup} color="primary" autoFocus>
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

GroupInformation.propTypes = {
    groupData: PropTypes.shape({
        groupID: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        adminUserID: PropTypes.number.isRequired,
        creationDate: PropTypes.string.isRequired,
        privacyLevel: PropTypes.oneOf([0, 1, 2]).isRequired,
    }).isRequired,
};

export default GroupInformation;
