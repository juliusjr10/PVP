using System.Linq;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Data;
using PVP.Server.Data.UserRepo;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Models;

namespace PVP.Server.Helpers.Services
{
    public class FriendsService : IFriendsService
    {
        private readonly AppDbContext _context;

        public FriendsService(AppDbContext context, IUserRepository userRepository)
        {
            _context = context;
        }

        public async Task<ICollection<User>> GetAllFriends(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Friends)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                // Handle user not found scenario
                return null;
            }

            return user.Friends.ToList();
        }

        public async Task<bool> AddFriend(int userId, int friendId)
        {
            // Check if the user and friend exist
            var user = await _context.Users.FindAsync(userId);
            var friend = await _context.Users.FindAsync(friendId);

            if (user == null || friend == null)
            {
                // Return false if either the user or friend doesn't exist
                return false;
            }

            // Check if they are already friends
            if (user.Friends.Any(f => f.Id == friendId))
            {
                // Return false if they are already friends
                return false;
            }

            if (userId == friendId)
            {
                return false;
            }

            // Add friend to user's friend list
            user.Friends.Add(friend);
            friend.Friends.Add(user);

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                // Handle exception if saving changes fails
                return false;
            }
        }

        public async Task<bool> CreateFriendRequest(int senderId, int receiverId)
        {
            // Check if the sender and receiver exist
            var sender = await _context.Users
                .Include(u => u.Friends)
                .FirstOrDefaultAsync(u => u.Id == senderId);

            var receiver = await _context.Users
                .Include(u => u.Friends)
                .FirstOrDefaultAsync(u => u.Id == receiverId);

            if (sender == null || receiver == null)
            {
                // Return false if either the sender or receiver doesn't exist
                return false;
            }

            if (senderId == receiverId)
            {
                // Return false if the sender and receiver are the same user
                return false;
            }

            // Check if the sender and receiver are already friends
            if (sender.Friends.Any(friend => friend.Id == receiverId) || receiver.Friends.Any(friend => friend.Id == senderId))
            {
                // Return false if the sender and receiver are already friends
                return false;
            }

            // Check if a friend request already exists between these users
            var existingRequest = await _context.FriendRequests
                .FirstOrDefaultAsync(fr => fr.SenderId == senderId && fr.ReceiverId == receiverId);

            if (existingRequest != null)
            {
                // Return false if a friend request already exists
                return false;
            }

            // Create a new friend request
            var newFriendRequest = new FriendRequest
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                RequestDateTime = DateTime.Now,
                Status = FriendRequestStatus.Pending // You can set any default status here
            };

            try
            {
                // Add the friend request to the context and save changes
                _context.FriendRequests.Add(newFriendRequest);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                // Handle exception if saving changes fails
                return false;
            }
        }

        public async Task<ICollection<FriendRequest>> GetFriendRequests(int userId)
        {
            // Retrieve friend requests where the specified user is the receiver
            var friendRequests = await _context.FriendRequests
                .Include(fr => fr.Sender) // Include sender details
                .Where(fr => fr.ReceiverId == userId && fr.Status == FriendRequestStatus.Pending)
                .ToListAsync();

            return friendRequests;
        }

        public async Task<bool> AcceptFriendRequest(int requestId)
        {
            // Find the friend request by its ID
            var friendRequest = await _context.FriendRequests.FindAsync(requestId);

            if (friendRequest == null || friendRequest.Status != FriendRequestStatus.Pending)
            {
                // Return false if the friend request doesn't exist or it's not pending
                return false;
            }

            // Retrieve sender and receiver user objects
            var sender = await _context.Users.FindAsync(friendRequest.SenderId);
            var receiver = await _context.Users.FindAsync(friendRequest.ReceiverId);

            if (sender == null || receiver == null)
            {
                // Return false if either the sender or receiver doesn't exist
                return false;
            }

            // Add sender to receiver's friend list
            receiver.Friends.Add(sender);
            // Add receiver to sender's friend list
            sender.Friends.Add(receiver);

            // Update friend request status to accepted
            friendRequest.Status = FriendRequestStatus.Accepted;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                // Handle exception if saving changes fails
                return false;
            }
        }

        public async Task<bool> DeclineFriendRequest(int requestId)
        {
            // Find the friend request by its ID
            var friendRequest = await _context.FriendRequests.FindAsync(requestId);

            if (friendRequest == null || friendRequest.Status != FriendRequestStatus.Pending)
            {
                // Return false if the friend request doesn't exist or it's not pending
                return false;
            }

            // Update friend request status to declined
            friendRequest.Status = FriendRequestStatus.Declined;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                // Handle exception if saving changes fails
                return false;
            }
        }
        public async Task<bool> DeleteFriend(int userId, int friendId)
        {
            // Check if the user and friend exist
            var user = await _context.Users
                .Include(u => u.Friends)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var friend = await _context.Users
                .Include(u => u.Friends)
                .FirstOrDefaultAsync(u => u.Id == friendId);

            if (user == null || friend == null)
            {
                // Return false if either the user or friend doesn't exist
                return false;
            }

            // Check if they are friends

            var friendshipToRemove = user.Friends.First(x => x.Id == friendId);
            if (friendshipToRemove == null)
            {
                // Return false if they are not friends
                return false;
            }

            // Remove friend relationship
            user.Friends.Remove(friendshipToRemove);
            friend.Friends.Remove(user);

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                // Handle exception if saving changes fails
                return false;
            }
        }
    }
}