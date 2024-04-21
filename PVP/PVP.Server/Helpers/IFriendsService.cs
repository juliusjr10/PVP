﻿using PVP.Server.Models;

namespace PVP.Server.Helpers
{
    public interface IFriendsService
    {
        Task<ICollection<User>> GetAllFriends(int userId);

        Task<bool> AddFriend(int userId, int friendId);
        Task<bool> CreateFriendRequest(int senderId, int receiverId);

        Task<ICollection<FriendRequest>> GetFriendRequests(int userId);
        Task<bool> AcceptFriendRequest(int requestId);

        Task<bool> DeclineFriendRequest(int requestId);
    }
}
