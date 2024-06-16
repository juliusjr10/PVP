using MimeKit;
using MimeKit.Text;
using System.Net;
using System.Net.Mail;
using PVP.Server.Data;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Models;
using PVP.Server.Dtos;
using PVP.Server.Helpers.Interfaces;

namespace PVP.Server.Helpers.Services
{
    public class HabitService : IHabitService
    {
        private readonly AppDbContext _context;

        public HabitService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<HabitUser?> AddUserHabit(int userId, int habitId, bool isGoal = false, int goal = 0, string frequency = "", string time = "")
        {
            HabitUser habitUser;


                habitUser = new HabitUser
                {
                    UserId = userId,
                    HabitId = habitId,
                    Goal = goal,
                    Frequency = frequency,
                    Time = time
                };

            await _context.HabitUser.AddAsync(habitUser);
            await _context.SaveChangesAsync();
            return habitUser;
        }


        public async Task<ICollection<HabitUser>> GetAllUserHabits(int userId)
        {
            var habitUserList = _context.HabitUser
                .Where(hu => hu.UserId == userId)
                .Include(hu => hu.CheckIns).ToList();
            if (habitUserList == null)
            {
                return [];
            }
            return habitUserList;
        }
        public async Task<ICollection<Habit>> GetAllHabits()
        {
            var habitList = _context.Habits
                .ToList();
            if (habitList == null)
            {
                return [];
            }
            return habitList;
        }
        public async Task<ICollection<Habit>> GetHabitByName(string name)
        {
            var habitList = _context.Habits.Where(hu => hu.Name == name).ToList();
            if (habitList == null || habitList.Count == 0)
            {
                return new List<Habit>(); // Return an empty collection
            }
            return habitList;
        }
        public async Task<CheckIn?> CheckIn(CheckInDTO dto, int userId)
        {
            var habitUser = await _context.HabitUser
                .FirstOrDefaultAsync(hu => hu.UserId == userId && hu.HabitId == dto.HabitId);

            var checkInDate = dto.Date;

            var existingCheckIn = await _context.CheckIns
                .FirstOrDefaultAsync(ci => ci.HabitUserId == habitUser.Id &&
                                             ci.Date.Year == checkInDate.Year &&
                                             ci.Date.Month == checkInDate.Month &&
                                             ci.Date.Day == checkInDate.Day);

            if (existingCheckIn != null)
            {
                return null;
            }

            var checkin = new CheckIn
            {
                HabitUserId = habitUser.Id,
                Mood = (Mood)dto.Mood,
                Date = dto.Date,
                Note = dto.Note,
            };

            await _context.CheckIns.AddAsync(checkin);
            await _context.SaveChangesAsync();
            return checkin;
        }
        public async Task<ICollection<CheckIn>> GetUserHabitCheckins(int userId, int habitId)
        {
            var checkIns = _context.HabitUser
            .Where(h => h.UserId == userId && h.HabitId == habitId)
            .SelectMany(ch => ch.CheckIns)
            .ToList();

            return checkIns;
        }
        public async Task<bool> DeleteHabit(int userId, int habitId)
        {
            // Find the HabitUser record to delete
            var habitUserToDelete = await _context.HabitUser
                .Include(hu => hu.CheckIns) // Include associated check-ins
                .FirstOrDefaultAsync(hu => hu.UserId == userId && hu.HabitId == habitId);

            // If HabitUser record doesn't exist, return false indicating failure
            if (habitUserToDelete == null)
                return false;

            try
            {
                // Remove all associated check-ins
                _context.CheckIns.RemoveRange(habitUserToDelete.CheckIns);

                // Remove the HabitUser record from the context
                _context.HabitUser.Remove(habitUserToDelete);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return true indicating successful deletion
                return true;
            }
            catch (Exception ex)
            {
                // Log any exceptions if needed
                Console.WriteLine($"Error deleting habit: {ex.Message}");
                return false; // Return false indicating failure
            }
        }
        public async Task<Habit?> GetHabitById(int habitId)
        {
            try
            {
                var habit = await _context.Habits.FindAsync(habitId);
                return habit; // Return the habit if found
            }
            catch (Exception ex)
            {
                // Log any exceptions if needed
                Console.WriteLine($"Error fetching habit by ID: {ex.Message}");
                return null; // Return null if an error occurs
            }
        }
        public async Task<(int? Goal, string Frequency, string Time)?> GetGoalFrequencyTimeByHabitUserId(int habitUserId)
        {
            try
            {
                var habitUser = await _context.HabitUser
                    .FirstOrDefaultAsync(hu => hu.Id == habitUserId);

                if (habitUser == null)
                {
                    return null; // If the habit user is not found or is not a GoalHabitUser, return null
                }

                return (habitUser.Goal, habitUser.Frequency, habitUser.Time);
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                Console.WriteLine($"Error fetching goal, frequency, and time: {ex.Message}");
                return null; // Return null in case of an error
            }
        }
        public async Task<int?> GetHabitUserIdByHabitIdAndUserId(int userId, int habitId)
        {
            try
            {
                var habitUser = await _context.HabitUser
                    .FirstOrDefaultAsync(hu => hu.UserId == userId && hu.HabitId == habitId);

                return habitUser?.Id;
            }
            catch (Exception ex)
            {
                // Log any exceptions if needed
                Console.WriteLine($"Error fetching HabitUserId by HabitId and UserId: {ex.Message}");
                return null; // Return null if an error occurs
            }
        }
        public async Task<ICollection<(string Note, DateTime Date)>> NotesByUserIdAndHabitId(int userId, int habitId)
        {
            try
            {
                var habitUser = await _context.HabitUser
                    .Include(hu => hu.CheckIns)
                    .FirstOrDefaultAsync(hu => hu.UserId == userId && hu.HabitId == habitId);

                if (habitUser == null)
                {
                    return new List<(string, DateTime)>(); // Return an empty collection if habit user not found
                }

                // Extract notes and dates from check-ins
                var notesWithDates = habitUser.CheckIns
                    .Where(ci => !string.IsNullOrEmpty(ci.Note))
                    .Select(ci => (ci.Note, ci.Date))
                    .ToList();

                return notesWithDates;
            }
            catch (Exception ex)
            {
                // Log any exceptions if needed
                Console.WriteLine($"Error fetching notes by UserId and HabitId: {ex.Message}");
                return new List<(string, DateTime)>(); // Return an empty collection in case of an error
            }
        }



    }
}
