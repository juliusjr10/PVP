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
import { useNavigate } from 'react-router-dom';

const GroupInformation = ({ groupData }) => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [showReactionOptions, setShowReactionOptions] = useState({});
    const [reactionsCounts, setReactionsCounts] = useState({});
    const [userReactions, setUserReactions] = useState({});
    const reactionTimeouts = useRef({});

    useEffect(() => {
        fetchPosts();
        fetchUserReactions(); // Fetch user's reactions for all posts
    }, [groupData.groupID]);
    const navigate = useNavigate();

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
            const userReactionsData = {};
            await Promise.all(posts.map(async (post) => {
                const response = await fetch(`https://localhost:7200/api/Post/userreaction?postId=${post.postID}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const reactionData = await response.json();
                    if (reactionData.reactionType !== null) {
                        userReactionsData[post.postID] = reactionData.reactionType;
                    }
                } else {
                    console.error(`Failed to fetch user reaction for post ${post.postID}`);
                }
            }));
            setUserReactions(userReactionsData);
        } catch (error) {
            console.error('Error fetching user reactions:', error);
        }
    };

    useEffect(() => {
        fetchReactionsCounts();
    }, [posts]);

    const fetchReactionsCounts = async () => {
        try {
            const counts = {};
            await Promise.all(posts.map(async (post) => {
                const response = await fetch(`https://localhost:7200/api/Post/reactionscount/${post.postID}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const count = await response.json();
                    counts[post.postID] = count;
                } else {
                    console.error(`Failed to fetch reactions count for post ${post.postID}`);
                }
            }));
            setReactionsCounts(counts);
        } catch (error) {
            console.error('Error fetching reactions counts:', error);
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
                navigate('/groups');
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
            if (show) {
                setShowReactionOptions((prev) => ({
                    ...prev,
                    [postId]: true,
                }));
                if (reactionTimeouts.current[postId]) {
                    clearTimeout(reactionTimeouts.current[postId]);
                }
            } else {
                reactionTimeouts.current[postId] = setTimeout(() => {
                    setShowReactionOptions((prev) => ({
                        ...prev,
                        [postId]: false,
                    }));
                }, 1500);
            }
        }
    };

    const reactToPost = async (postId, reaction) => {
        try {
            let endpoint = '';
            if (reaction === 1) {
                endpoint = `https://localhost:7200/api/Post/likepost?postId=${postId}&reaction=1`;
            } else if (reaction === 2) {
                endpoint = `https://localhost:7200/api/Post/likepost?postId=${postId}&reaction=2`;
            } else {
                console.error('Invalid reaction type');
                return;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Post reacted successfully');
                if (userReactions[postId] === reaction) {
                    // If the same reaction is clicked again, delete the reaction
                    deleteReaction(postId, reaction);
                } else {
                    // If a different reaction is clicked, set the new reaction
                    fetchReactionCount(postId, reaction);
                    setUserReactions((prev) => ({
                        ...prev,
                        [postId]: reaction,
                    }));
                }
            } else {
                console.error('Failed to react to the post');
            }
        } catch (error) {
            console.error('Error reacting to the post:', error);
        }
    };

    const deleteReaction = async (postId, reaction) => {
        try {
            const endpoint = `https://localhost:7200/api/Post/deletelike?postId=${postId}`;
            const response = await fetch(endpoint, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Reaction deleted successfully');
                // Reset userReactions and fetch updated counts
                setUserReactions((prev) => ({
                    ...prev,
                    [postId]: null,
                }));
                fetchReactionsCounts();
            } else {
                console.error('Failed to delete the reaction');
            }
        } catch (error) {
            console.error('Error deleting the reaction:', error);
        }
    };

    const fetchReactionCount = async (postId, reaction) => {
        try {
            const response = await fetch(`https://localhost:7200/api/Post/likecount?postId=${postId}&reaction=${reaction}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const count = await response.json();
                // Handle the count based on reaction type
                setReactionsCounts((prevCounts) => ({ ...prevCounts, [postId]: count }));
            } else {
                console.error(`Failed to fetch reaction count for post ${postId}`);
            }
        } catch (error) {
            console.error('Error fetching reaction count:', error);
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
                                        onMouseEnter={() => toggleReactionOptions(post.postID, true)}
                                        onMouseLeave={() => toggleReactionOptions(post.postID, false)}
                                        style={{ display: 'inline-block' }}
                                    >
                                        React
                                    </Button>
                                )}

                                {showReactionOptions[post.postID] && (
                                    <div
                                        onMouseEnter={() => toggleReactionOptions(post.postID, true)}
                                        onMouseLeave={() => toggleReactionOptions(post.postID, false)}
                                    >
                                        {!userReactions[post.postID] && (
                                            <>
                                                <Button onClick={() => reactToPost(post.postID, 1)}>👍</Button>
                                                <Button onClick={() => reactToPost(post.postID, 2)}>❤️</Button>
                                            </>
                                        )}
                                        {userReactions[post.postID] && (
                                            <Typography variant="body2">
                                                {userReactions[post.postID] === 1 ? '👍' : '❤️'}
                                            </Typography>
                                        )}
                                    </div>
                                )}
                                <Typography variant="caption" color="textSecondary" style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    Reactions: {reactionsCounts[post.postID] || 0}
                                </Typography>
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
