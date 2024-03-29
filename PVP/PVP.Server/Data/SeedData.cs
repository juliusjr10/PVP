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
                Name = "Vardenis",
                Lastname = "Pavardenis",
                Username = "testuser",
                Email = "testuser@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                DateOfBirth = DateTime.Parse(dateString)
            };
            var firstHabit = new Habit()
            {
                Id = 1,
                Name = "Stop Smoking Habit"
            };

            var secondHabit = new Habit()
            {
                Id = 2,
                Name = "Meditation Habit"
            };

            var thirdHabit = new Habit()
            {
                Id = 3,
                Name = "Water Habit"
            };

            var firstUserHabit = new HabitUser()
            {
                Id = 1,
                HabitId = 1,
                UserId = 1
            };
            var secondUserHabit = new HabitUser()
            {
                Id = 2,
                HabitId = 2,
                UserId = 1
            };
            var thirdUserHabit = new HabitUser()
            {
                Id = 3,
                HabitId = 3,
                UserId = 1
            };
            var users = new List<User>() { firstUser };
            var habits = new List<Habit>() { firstHabit, secondHabit, thirdHabit };
            var userhabits = new List<HabitUser> { firstUserHabit, secondUserHabit, thirdUserHabit };
            await context.AddRangeAsync(users);
            await context.AddRangeAsync(habits);
            await context.AddRangeAsync(userhabits);
            await context.SaveChangesAsync();
        }
    }
}
