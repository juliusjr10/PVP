using MimeKit;
using MimeKit.Text;
using System.Net;
using System.Net.Mail;
using PVP.Server.Data;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Models;
using PVP.Server.Dtos;

namespace PVP.Server.Helpers
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
            var user = await _context.Users
                .Include(u => u.HabitUser)
                .FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return null;
            }
            var habit = await _context.Habits
                .Where(w => w.Id == habitId)
                .Include(w => w.HabitUser)
                .FirstOrDefaultAsync();
            if (habit == null)
            {
                return null;
            }
            var habitUser = new HabitUser();
            habit.HabitUser.Add(habitUser);
            user.HabitUser.Add(habitUser);
            await _context.SaveChangesAsync();
            return habitUser;
        }

        public async Task<ICollection<HabitUser>> GetAllUserHabits(int userId)
        {
            var user = await _context.Users
                .Include(u => u.HabitUser)
                .FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return [];
            }
            var habitList = user.HabitUser;
            if(habitList == null)
            {
                return [];
            }
            return habitList;
        }
        public async Task<CheckIn?> CheckIn(CheckInDTO dto, int userId)
        {
            var user = await _context.Users
              .Include(u => u.HabitUser)
              .Include(u => u.HabitUser)
              .FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return null;
            }
            var habitList = user.HabitUser;
            if (habitList == null)
            {
                return null;
            }
        }
    }
}
