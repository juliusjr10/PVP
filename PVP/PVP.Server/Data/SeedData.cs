using Microsoft.EntityFrameworkCore;
using PVP.Server.Models;

namespace PVP.Server.Data
{
    public static class SeedData
    {
        public static async Task Seed(AppDbContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            string dateString = "1999-05-12";

            var firstUser = new User()
            {
                Id = 1,
                Name = "Testas",
                Lastname = "Testauskas",
                Username = "testuser",
                Email = "walterheisenberg@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                DateOfBirth = DateTime.Parse(dateString)
            };
            var firstHabit = new Habit()
            {
                Id = 1,
                Name = "Stop Smoking"
            };

            var secondHabit = new Habit()
            {
                Id = 2,
                Name = "Stop Masturbating"
            };


            var users = new List<User>() { firstUser };
            var habits = new List<Habit>() { firstHabit, secondHabit };

            await context.AddRangeAsync(users);
            await context.AddRangeAsync(habits);
            await context.SaveChangesAsync();
        }
    }
}
