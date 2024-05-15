﻿using Microsoft.EntityFrameworkCore;
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
            modelBuilder.Entity<User>()
                .HasMany(e => e.Friends)
                .WithMany();
            modelBuilder
                .Entity<Challenge>()
                .Property(e => e.ChallengeStatus)
                .HasConversion(
                    v => v.ToString(),
                    v => (ChallengeStatus)Enum.Parse(typeof (ChallengeStatus), v));
            modelBuilder
                .Entity<ChallengeRequest>()
                .Property(e => e.ChallengeType)
                .HasConversion(
                    v => v.ToString(),
                    v => (ChallengeType)Enum.Parse(typeof(ChallengeType), v));
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Habit>Habits { get; set; }
        public DbSet<WeekDay> WeekDays { get; set; }
        public DbSet<HabitUser> HabitUser { get; set; }
        public DbSet<CheckIn> CheckIns { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupMember> GroupMembers { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<CommentLike> CommentLikes { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<ChallengeRequest> ChallengeRequests { get; set; }

    }
}
