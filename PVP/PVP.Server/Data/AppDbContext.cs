using Microsoft.EntityFrameworkCore;
using PVP.Server.Models;

namespace PVP.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
            modelBuilder
                .Entity<CheckIn>()
                .Property(e => e.Mood)
                .HasConversion(
                    v=>v.ToString(),
                    v=> (Mood)Enum.Parse(typeof(Mood), v));
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Habit>Habits { get; set; }
        public DbSet<WeekDay> WeekDays { get; set; }
        public DbSet<HabitUser> HabitUser { get; set; }
        public DbSet<CheckIn> CheckIns { get; set; }
    }
}
