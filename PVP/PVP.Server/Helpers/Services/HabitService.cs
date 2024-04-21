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
        public async Task<HabitUser?> AddUserHabit(int userId, int habitId)
        {
            var habitUser = new HabitUser
            {
                UserId = userId,
                HabitId = habitId
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

    }
}
