using Microsoft.EntityFrameworkCore;
using PVP.Server.Models;
using System;
using System.Collections.Generic;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            var checkIns = new List<CheckIn>() { };
            DateTime currentDate  = DateTime.ParseExact("2024 03 22 15:20", "yyyy MM dd HH:mm", null).Date;
            Random random = new Random();
            for (int i = 0; i < 25;i++)
            {
                    // Incrementing the date by one day
                    currentDate = currentDate.AddDays(1);
                if (i % 3 == 0)
                {
                    // Creating a new check-in
                    var newCheckIn = new CheckIn()
                    {
                        Id = i + 10, // Assuming the IDs continue from where we left off
                        HabitUserId = 1,
                        Mood = (Mood)random.Next(0, 4), // Random mood between 1 and 5
                        Date = currentDate,
                        Note = ""
                    };
                    checkIns.Add(newCheckIn);
                }
                if (i % 1 == 0)
                {
                    var newCheckIn1 = new CheckIn()
                    {
                        Id = i + 100, // Assuming the IDs continue from where we left off
                        HabitUserId = 2,
                        Mood = (Mood)random.Next(0, 4), // Random mood between 1 and 5
                        Date = currentDate,
                        Note = ""
                    };
                    checkIns.Add(newCheckIn1);
                }
                if (i % 2 == 0)
                {
                    var newCheckIn2 = new CheckIn()
                    {
                        Id = i + 1000, // Assuming the IDs continue from where we left off
                        HabitUserId = 3,
                        Mood = (Mood)random.Next(0, 4), // Random mood between 1 and 5
                        Date = currentDate,
                        Note = ""

                    };
                    checkIns.Add(newCheckIn2);
                }
            }
            var firstUserHabit = new HabitUser()
            {
                Id = 1,
                HabitId = 1,
                UserId = 1,
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
            await context.AddRangeAsync(checkIns);
            await context.SaveChangesAsync();
        }
    }
}
