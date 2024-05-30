import React, { useState, useEffect, useRef } from 'react';
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
    const [showReactionOptions, setShowReactionOptions] = useState({});
    const [reactionsCounts, setReactionsCounts] = useState({});
    const [userReactions, setUserReactions] = useState({});
    const reactionTimeouts = useRef({});

    useEffect(() => {
        const storedUserReactions = localStorage.getItem('userReactions');
        if (storedUserReactions) {
            setUserReactions(JSON.parse(storedUserReactions));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userReactions', JSON.stringify(userReactions));
    }, [userReactions]);

    useEffect(() => {
        fetchPosts();
    }, [groupData.groupID]);

    useEffect(() => {
        fetchUserReactions();
    }, [posts]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`https://localhost:7200/api/post/getallposts/${groupData.groupID}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();

            const postsWithUsers = await Promise.all(data.$values.map(async (post) => {
                const userResponse = await fetch(`https://localhost:7200/api/auth/user/${post.userID}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const userData = await userResponse.json();

                return { ...post, user: userData };
            }));
            setPosts(postsWithUsers);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchUserReactions = async () => {
        try {
            const updatedUserReactions = {};
            for (const post of posts) {
                const response = await fetch(`https://localhost:7200/api/post/userreaction/${post.postID}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.reaction) {
                    updatedUserReactions[post.postID] = data.reaction;
                }
            }
            setUserReactions(updatedUserReactions);
        } catch (error) {
            console.error('Error fetching user reactions:', error);
        }
    };
    const leaveGroup = async () => {
        try {
            const response = await fetch(`https://localhost:7200/api/group/leavegroup/${groupData.groupID}`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Left the group successfully');
                // Redirect to /groups
                window.location.href = '/groups';
            } else {
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

            const userResponse = await fetch('https://localhost:7200/api/auth/user', {
                method: 'GET',
                credentials: 'include',
            });
            const userData = await userResponse.json();

            const postData = {
                groupID: groupData.groupID,
                content: newPostContent,
                userID: userData.id,
                user: userData
            };

            const response = await fetch('https://localhost:7200/api/post/createpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
                credentials: 'include',
            });
            const createdPost = await response.json();

            setPosts([...posts, { ...createdPost, user: postData.user }]);
            setNewPostContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const toggleReactionOptions = (postId, show) => {
        if (!userReactions[postId]) {
            setShowReactionOptions((prev) => ({
                ...prev,
                [postId]: show,
            }));
        }
    };
    const fetchReactionsCount = async (postId) => {
        try {
            const response = await fetch(`https://localhost:7200/api/post/reactionscount/${postId}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setReactionsCounts((prevCounts) => ({
                    ...prevCounts,
                    [postId]: data,
                }));
            } else {
                console.error('Failed to fetch reactions count');
                // Set reactions count to 0 if there's an error
                setReactionsCounts((prevCounts) => ({
                    ...prevCounts,
                    [postId]: 0,
                }));
            }
        } catch (error) {
            console.error('Error fetching reactions count:', error);
            // Set reactions count to 0 if there's an error
            setReactionsCounts((prevCounts) => ({
                ...prevCounts,
                [postId]: 0,
            }));
        }
    };

    useEffect(() => {
        posts.forEach((post) => {
            fetchReactionsCount(post.postID);
        });
    }, [posts]);

    const reactToPost = async (postId, reactionType) => {
        try {
            const response = await fetch(`https://localhost:7200/api/post/likepost?postId=${postId}&reaction=${reactionType}`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Post liked successfully');
                // Update user reactions immediately after reacting to a post
                fetchUserReactions();
                // Fetch updated reaction counts for all posts
                fetchReactionsCount(postId);
            } else {
                console.error('Failed to like post');
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };


    // Function to remove user reaction
    // Function to remove user reaction
    // Function to remove user reaction
    const deleteReaction = async (postId) => {
        try {
            const response = await fetch(`https://localhost:7200/api/Post/deletelike?postId=${postId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Reaction deleted successfully');
                setUserReactions((prevUserReactions) => {
                    const updatedReactions = { ...prevUserReactions };
                    delete updatedReactions[postId];
                    return updatedReactions;
                });
                // Fetch reactions count after deleting reaction
                fetchReactionsCount(postId);
                // Reset showReactionOptions for the post
                setShowReactionOptions((prev) => ({
                    ...prev,
                    [postId]: false,
                }));
            } else {
                console.error('Failed to delete reaction');
            }
        } catch (error) {
            console.error('Error deleting reaction:', error);
        }
    };






    const mainFeaturedGroup = {
        title: groupData.name,
        description: groupData.description,
        image: 'https://source.unsplash.com/random?wallpapers',
        imageText: 'IMAGE TEXT',
    };

    return (
        <Box sx={{ position: 'relative', top: -50, width: '100%' }}>
            <MainFeaturedGroup post={mainFeaturedGroup} />
            <Button onClick={handleLeaveConfirmation} variant="contained" style={{ backgroundColor: 'red', color: 'white', marginBottom: '10px', float: 'right' }}>Leave Group</Button>
            <Grid container spacing={3} marginTop={2}>
                <Grid item xs={6} style={{ marginLeft: '300px' }}>
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            rows="4"
                            cols="40"
                            placeholder="Write your post here..."
                            style={{ border: '1px solid #7830ED', borderRadius: '5px', width: '100%' }}
                        />
                        <button style={{ width: '100%', marginTop: '20px' }} onClick={handlePostSubmit}>Send</button>
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                        {posts.slice().reverse().map((post) => (
                            <Paper key={post.postID} elevation={3} style={{ position: 'relative', padding: '20px', marginTop: '20px' }}>
                                <Typography variant="body1"><strong>{post.user.username}</strong> </Typography>
                                <Typography variant="body1">{post.content}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(post.timestamp).toLocaleString()}
                                </Typography>
                                {!userReactions[post.postID] && !showReactionOptions[post.postID] && (
                                    <Button
                                        onClick={() => toggleReactionOptions(post.postID, true)}
                                        style={{ position: 'absolute', bottom: '1px' }}
                                    >
                                        Like
                                    </Button>

                                )}

                                {showReactionOptions[post.postID] && (
                                    <div>
                                        {!userReactions[post.postID] && (
                                            <>
                                                <Button onClick={() => reactToPost(post.postID, 1)}>👍</Button>
                                                <Button onClick={() => reactToPost(post.postID, 2)}>❤️</Button>
                                            </>
                                        )}
                                    </div>
                                )}



                                <Typography variant="caption" color="textSecondary" style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    Reactions: {reactionsCounts[post.postID] || 0}
                                </Typography>
                                {/* Render the user's reaction */}
                                {userReactions[post.postID] && (
                                    <Typography variant="caption" color="textSecondary" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                                        You reacted: {userReactions[post.postID] === 1 ? '👍' : '❤️'}
                                        {userReactions[post.postID] && (
                                            <Button onClick={() => deleteReaction(post.postID)}>Undo Reaction</Button>
                                        )}
                                    </Typography>

                                )}
                            </Paper>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
            <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
                <DialogTitle>Leave Group</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to leave this group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation} color="primary">Cancel</Button>
                    <Button onClick={leaveGroup} color="primary" autoFocus>Leave</Button>
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

