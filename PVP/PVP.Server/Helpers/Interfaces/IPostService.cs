using PVP.Server.Dtos;
using PVP.Server.Models;

namespace PVP.Server.Helpers.Interfaces
{
    public interface IPostService
    {
        Task<Post?> CreatePost(CreatePostDTO dto, int userid);
        Task<bool?> DeletePost(DeletePostDTO dto, int userid);
        Task<ICollection<Post>?> GetAllPosts(int groupid);
        Task<Post?> GetPostById(int id);
        Task<bool> LikePost(int postId, string userId, ReactionType reaction);
        Task<int> GetLikesCountByReactionTypeAndPostId(int postId, ReactionType reaction);
        Task<bool> DeleteLikeByPostIdAndUserId(int postId, string userId);
        Task<int> GetAllReactionsCountByPostId(int postId);
    }
}
