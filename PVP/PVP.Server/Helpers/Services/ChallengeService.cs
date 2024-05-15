using Microsoft.EntityFrameworkCore;
using MimeKit;
using PVP.Server.Data;
using PVP.Server.Data.UserRepo;
using PVP.Server.Dtos;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Models;

namespace PVP.Server.Helpers.Services
{
    public class ChallengeService : IChallengeService
    {
        private readonly AppDbContext _context;

        public ChallengeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddChallenge(AddChallengeDTO dto)
        {
            try
            {
                if (dto.FirstChallengerId == dto.SecondChallengerId)
                {
                    Console.WriteLine($"Error adding challenge: both users are the same");
                    return false;
                }
                // Create a new Challenge entity
                var newChallenge = new Challenge
                {
                    Name = dto.Name, // Set the name of the challenge as needed
                    ChallengeType = dto.ChallengeType, // Set the type of the challenge as needed
                    ChallengeStatus = ChallengeStatus.InProgress,
                    ChallengeStart = DateTime.UtcNow, // Set the start date of the challenge
                    FirstChallengerId = dto.FirstChallengerId,
                    SecondChallengerId = dto.SecondChallengerId
                };

                // Add the new challenge to the context and save changes
                _context.Challenges.Add(newChallenge);
                await _context.SaveChangesAsync();

                return true; // Successfully added challenge
            }
            catch (Exception ex)
            {
                // Log or handle any exceptions here
                Console.WriteLine($"Error adding challenge: {ex.Message}");
                return false; // Failed to add challenge
            }
        }

        public async Task<bool> CreateChallengeRequest(int senderId, int habitId, CreateChallengeRequestDTO dto)
        {
            try
            {
                // Check if the sender and receiver exist
                var sender = await _context.Users.FindAsync(senderId);
                var receiver = await _context.Users.FindAsync(dto.ReceiverId);

                if (sender == null || receiver == null)
                {
                    Console.WriteLine("Error creating challenge request: Sender or receiver does not exist.");
                    return false;
                }

                if (senderId == dto.ReceiverId)
                {
                    Console.WriteLine("Error creating challenge request: Sender and receiver are the same.");
                    return false;
                }

                // Check if both users have a habit
                var senderHasHabit = _context.HabitUser.Any(hu => hu.UserId == senderId && hu.HabitId == habitId);
                var receiverHasHabit = _context.HabitUser.Any(hu => hu.UserId == dto.ReceiverId && hu.HabitId == habitId);
                var receiverHasRequest = _context.ChallengeRequests.Any(hu => hu.SenderId == dto.ReceiverId && hu.HabitId == habitId && hu.ReceiverId == senderId);
                var senderHasRequest = _context.ChallengeRequests.Any(hu => hu.SenderId == senderId && hu.HabitId == habitId && hu.ReceiverId == dto.ReceiverId);

                if (!senderHasHabit || !receiverHasHabit)
                {
                    Console.WriteLine("Error creating challenge request: Both users must have a habit.");
                    return false;
                }

                if (receiverHasRequest || senderHasRequest)
                {
                    Console.WriteLine("Error creating challenge request: sender or receiver already has request");
                    return false;
                }

                // Create a new ChallengeRequest entity
                var newChallengeRequest = new ChallengeRequest
                {
                    SenderId = senderId,
                    ReceiverId = dto.ReceiverId,
                    Name = dto.Name,
                    HabitId = habitId,
                    ChallengeType = dto.ChallengeType,
                    RequestDateTime = DateTime.UtcNow
                };

                // Add the new challenge request to the context and save changes
                _context.ChallengeRequests.Add(newChallengeRequest);
                await _context.SaveChangesAsync();

                return true; // Successfully created challenge request
            }
            catch (Exception ex)
            {
                // Log or handle any exceptions here
                Console.WriteLine($"Error creating challenge request: {ex.Message}");
                return false; // Failed to create challenge request
            }

        }
        public async Task<bool> AcceptChallenge(int challengeRequestId)
        {
            try
            {
                // Find the challenge request by ID
                var challengeRequest = await _context.ChallengeRequests.FindAsync(challengeRequestId);

                if (challengeRequest == null)
                {
                    Console.WriteLine("Error creating challenge request: Both users must have a habit.");
                    return false;
                }
                var firstHabitUser = _context.HabitUser.Any(hu => hu.UserId == challengeRequest.SenderId && hu.HabitId == challengeRequest.HabitId);
                var secondHabitUser = _context.HabitUser.Any(hu => hu.UserId == challengeRequest.ReceiverId && hu.HabitId == challengeRequest.HabitId);
                if (!firstHabitUser || !secondHabitUser)
                {
                    Console.WriteLine("Error accepting challenge: Challenge request not found.");
                    return false;
                }
                var newChallenge = new Challenge
                {
                    Name = challengeRequest.Name, // Set the name of the challenge as needed
                    ChallengeType = challengeRequest.ChallengeType, // Set the type of the challenge as needed
                    ChallengeStatus = ChallengeStatus.InProgress,
                    ChallengeStart = DateTime.UtcNow, // Set the start date of the challenge
                    FirstChallengerId = challengeRequest.SenderId,
                    SecondChallengerId = challengeRequest.ReceiverId,
                    HabitId = challengeRequest.HabitId,

                };

                _context.Challenges.Add(newChallenge);
                _context.ChallengeRequests.Remove(challengeRequest);
                await _context.SaveChangesAsync();

                return true; // Successfully accepted challenge
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error accepting challenge: {ex.Message}");
                return false; // Failed to accept challenge
            }
        }

        public async Task<bool> DeclineChallengeRequest(int requestId)
        {
            // Find the friend request by its ID
            var challengeRequest = await _context.ChallengeRequests.FindAsync(requestId);

            if (challengeRequest == null)
            {
                // Return false if the friend request doesn't exist or it's not pending
                return false;
            }

            _context.ChallengeRequests.Remove(challengeRequest);

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

        public async Task<ICollection<ChallengeRequest>> GetChallengeRequests(int userId)
        {
            // Retrieve friend requests where the specified user is the receiver
            var challengeRequests = await _context.ChallengeRequests
                .Include(fr => fr.Sender) // Include sender details
                .Where(fr => fr.ReceiverId == userId)
                .ToListAsync();

            return challengeRequests;
        }

        public async Task<ICollection<Challenge>> GetChallengesForUser(int userId)
        {
            try
            {
                // Retrieve challenges where the specified user is either the first or second challenger
                var challenges = await _context.Challenges
                    .Where(c => c.FirstChallengerId == userId || c.SecondChallengerId == userId)
                    .ToListAsync();

                return challenges;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving challenges for user: {ex.Message}");
                return null; // Return null or handle the error appropriately
            }
        }
    }
}
