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
    }
}
