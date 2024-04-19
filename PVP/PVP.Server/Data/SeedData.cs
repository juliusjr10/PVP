﻿using Microsoft.EntityFrameworkCore;
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

            // Second User
            var secondUser = new User()
            {
                Id = 2,
                Name = "John",
                Lastname = "Doe",
                Username = "johndoe",
                Email = "johndoe@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                DateOfBirth = DateTime.Parse(dateString)
            };

            // Third User
            var thirdUser = new User()
            {
                Id = 3,
                Name = "Jane",
                Lastname = "Smith",
                Username = "janesmith",
                Email = "janesmith@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                DateOfBirth = DateTime.Parse(dateString)
            };
            // First Group
            var firstGroup = new Group()
            {
                GroupID = 1,
                Name = "Group 1",
                Description = "Description of Group 1",
                AdminUserID = firstUser.Id,
                CreationDate = DateTime.Now,
                PrivacyLevel = PrivacyLevel.Public
            };

            // Second Group
            var secondGroup = new Group()
            {
                GroupID = 2,
                Name = "Group 2",
                Description = "Description of Group 2",
                AdminUserID = secondUser.Id,
                CreationDate = DateTime.Now,
                PrivacyLevel = PrivacyLevel.InviteOnly
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
            var users = new List<User>() { firstUser, secondUser, thirdUser };
            var habits = new List<Habit>() { firstHabit, secondHabit, thirdHabit };
            var groups = new List<Group>() { firstGroup, secondGroup };
            var userhabits = new List<HabitUser> { firstUserHabit, secondUserHabit, thirdUserHabit };

            var posts = new List<Post>()
            {
                new Post() { GroupID = firstGroup.GroupID, UserID = firstUser.Id, Content = "First post in Group 1", Timestamp = DateTime.Now },
                new Post() { GroupID = firstGroup.GroupID, UserID = secondUser.Id, Content = "Second post in Group 1", Timestamp = DateTime.Now },
                new Post() { GroupID = secondGroup.GroupID, UserID = thirdUser.Id, Content = "First post in Group 2", Timestamp = DateTime.Now },
                new Post() { GroupID = secondGroup.GroupID, UserID = firstUser.Id, Content = "Second post in Group 2", Timestamp = DateTime.Now }
            };

            await context.AddRangeAsync(users);
            await context.AddRangeAsync(groups);
            await context.AddRangeAsync(habits);
            await context.AddRangeAsync(userhabits);
            await context.AddRangeAsync(checkIns);
            await context.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}
