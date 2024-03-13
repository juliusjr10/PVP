using Microsoft.EntityFrameworkCore;
using PVP.Server.Models;

namespace PVP.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User>Users { get; set; }

        public DbSet<Habit>Habits { get; set; }
        public DbSet<WeekDay> WeekDays { get; set; }
    }
}
