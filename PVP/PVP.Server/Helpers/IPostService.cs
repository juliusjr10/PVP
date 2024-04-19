using PVP.Server.Dtos;
using PVP.Server.Models;

namespace PVP.Server.Helpers
{
    public interface IPostService
    {
        Task<Post?> CreatePost(CreatePostDTO dto, int userid);
        Task<bool?> DeletePost(DeletePostDTO dto, int userid);
        Task<ICollection<Post>?> GetAllPosts(int groupid);
        Task<Post?> GetPostById(int id);
    }
}
