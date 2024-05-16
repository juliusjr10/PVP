using PVP.Server.Models;

namespace PVP.Server.Helpers.Interfaces
{
    public interface IFriendsService
    {
        Task<ICollection<User>> GetAllFriends(int userId);

        Task<bool> AddFriend(int userId, int friendId);
        Task<bool> CreateFriendRequest(int senderId, int receiverId);

        Task<ICollection<FriendRequest>> GetFriendRequests(int userId);
        Task<bool> AcceptFriendRequest(int requestId);

        Task<bool> DeclineFriendRequest(int requestId);
        Task<bool> DeleteFriend(int userId, int friendId);
        Task<User> GetFriendById(int userId, int friendId);
    }
}
