using Microsoft.EntityFrameworkCore;
using PVP.Server.Data;
using PVP.Server.Dtos;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Models;

namespace PVP.Server.Helpers.Services
{
    public class PostService : IPostService
    {
        private readonly AppDbContext _context;
        public PostService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Post?> CreatePost(CreatePostDTO dto, int userid)
        {
            if (dto == null)
            {
                return null;
            }
            var newPost = new Post
            {
                UserID = userid,
                GroupID = dto.GroupID,
                Content = dto.Content,
                Timestamp = DateTime.Now,
            };
            await _context.Posts.AddAsync(newPost);
            await _context.SaveChangesAsync();

            return newPost;
        }

        public Task<bool?> DeletePost(DeletePostDTO dto, int userid)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Post>?> GetAllPosts(int groupid)
        {
            var posts = await _context.Posts
                .Include(w => w.Comments)
                .Where(w => w.GroupID == groupid)
                .ToListAsync();
            if (posts == null) { return null; }
            return posts;
        }

        public async Task<Post?> GetPostById(int id)
        {
            var group = await _context.Posts
                .Include(w => w.Comments)
                .FirstOrDefaultAsync(w => w.PostID == id);
            if (group == null) { return null; }
            return group;
        }
        public async Task<bool> LikePost(int postId, string userId, ReactionType reaction)
        {
            // Check if the post exists
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
            {
                return false; // Post not found
            }

            // Check if the user has already liked this post
            var existingLike = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostID == postId && l.UserID == userId);

            if (existingLike != null)
            {
                // Update the reaction if the user has already liked the post
                existingLike.Reaction = reaction;
            }
            else
            {
                // Add a new like
                var like = new Like
                {
                    PostID = postId,
                    UserID = userId,
                    Reaction = reaction,
                    Timestamp = DateTime.Now
                };

                await _context.Likes.AddAsync(like);
            }

            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<int> GetLikesCountByReactionTypeAndPostId(int postId, ReactionType reaction)
        {
            var likesCount = await _context.Likes
                .Where(l => l.PostID == postId && l.Reaction == reaction)
                .CountAsync();
            return likesCount;
        }
        public async Task<bool> DeleteLikeByPostIdAndUserId(int postId, string userId)
        {
            // Check if the like exists
            var like = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostID == postId && l.UserID == userId);

            if (like == null)
            {
                return false; // Like not found
            }

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<int> GetAllReactionsCountByPostId(int postId)
        {
            // Get the count of likes for the specified post
            var likesCount = await _context.Likes
                .Where(l => l.PostID == postId)
                .CountAsync();

            return likesCount;
        }

    }
}
