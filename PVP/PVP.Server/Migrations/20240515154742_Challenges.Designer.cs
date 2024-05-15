﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PVP.Server.Data;

#nullable disable

namespace PVP.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240515154742_Challenges")]
    partial class Challenges
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("PVP.Server.Models.Challenge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("ChallengeStart")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ChallengeStatus")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ChallengeType")
                        .HasColumnType("int");

                    b.Property<int>("FirstChallengerId")
                        .HasColumnType("int");

                    b.Property<int>("HabitId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SecondChallengerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FirstChallengerId");

                    b.HasIndex("HabitId");

                    b.HasIndex("SecondChallengerId");

                    b.ToTable("Challenges");
                });

            modelBuilder.Entity("PVP.Server.Models.ChallengeRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ChallengeType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("HabitId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ReceiverId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RequestDateTime")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("SenderId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("HabitId");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("ChallengeRequests");
                });

            modelBuilder.Entity("PVP.Server.Models.CheckIn", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("HabitUserId")
                        .HasColumnType("int");

                    b.Property<string>("Mood")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Note")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("HabitUserId");

                    b.ToTable("CheckIns");
                });

            modelBuilder.Entity("PVP.Server.Models.Comment", b =>
                {
                    b.Property<int>("CommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PostID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("CommentId");

                    b.HasIndex("PostID");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("PVP.Server.Models.CommentLike", b =>
                {
                    b.Property<int>("CommentLikeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CommentID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("CommentLikeId");

                    b.HasIndex("CommentID");

                    b.ToTable("CommentLikes");
                });

            modelBuilder.Entity("PVP.Server.Models.FriendRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ReceiverId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RequestDateTime")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("SenderId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("FriendRequests");
                });

            modelBuilder.Entity("PVP.Server.Models.Group", b =>
                {
                    b.Property<int>("GroupID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AdminUserID")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PrivacyLevel")
                        .HasColumnType("int");

                    b.HasKey("GroupID");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("PVP.Server.Models.GroupMember", b =>
                {
                    b.Property<int>("GroupMemberID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("GroupID")
                        .HasColumnType("int");

                    b.Property<DateTime>("JoinDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("RoleLevel")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("GroupMemberID");

                    b.HasIndex("GroupID");

                    b.ToTable("GroupMembers");
                });

            modelBuilder.Entity("PVP.Server.Models.Habit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Habits");
                });

            modelBuilder.Entity("PVP.Server.Models.HabitUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("HabitId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("HabitId");

                    b.HasIndex("UserId");

                    b.ToTable("HabitUser");
                });

            modelBuilder.Entity("PVP.Server.Models.Like", b =>
                {
                    b.Property<int>("LikeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PostID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("LikeId");

                    b.HasIndex("PostID");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("PVP.Server.Models.Post", b =>
                {
                    b.Property<int>("PostID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("GroupID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("PostID");

                    b.HasIndex("GroupID");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("PVP.Server.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordResetToken")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("ResetTokenExpires")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PVP.Server.Models.WeekDay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("HabitId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("HabitId");

                    b.ToTable("WeekDays");
                });

            modelBuilder.Entity("UserUser", b =>
                {
                    b.Property<int>("FriendsId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("FriendsId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserUser");
                });

            modelBuilder.Entity("PVP.Server.Models.Challenge", b =>
                {
                    b.HasOne("PVP.Server.Models.User", "FirstChallenger")
                        .WithMany()
                        .HasForeignKey("FirstChallengerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PVP.Server.Models.Habit", "Habit")
                        .WithMany()
                        .HasForeignKey("HabitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PVP.Server.Models.User", "SecondChallenger")
                        .WithMany()
                        .HasForeignKey("SecondChallengerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FirstChallenger");

                    b.Navigation("Habit");

                    b.Navigation("SecondChallenger");
                });

            modelBuilder.Entity("PVP.Server.Models.ChallengeRequest", b =>
                {
                    b.HasOne("PVP.Server.Models.Habit", "Habit")
                        .WithMany()
                        .HasForeignKey("HabitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PVP.Server.Models.User", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PVP.Server.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Habit");

                    b.Navigation("Receiver");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("PVP.Server.Models.CheckIn", b =>
                {
                    b.HasOne("PVP.Server.Models.HabitUser", null)
                        .WithMany("CheckIns")
                        .HasForeignKey("HabitUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PVP.Server.Models.Comment", b =>
                {
                    b.HasOne("PVP.Server.Models.Post", null)
                        .WithMany("Comments")
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PVP.Server.Models.CommentLike", b =>
                {
                    b.HasOne("PVP.Server.Models.Comment", null)
                        .WithMany("CommentLikes")
                        .HasForeignKey("CommentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PVP.Server.Models.FriendRequest", b =>
                {
                    b.HasOne("PVP.Server.Models.User", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PVP.Server.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Receiver");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("PVP.Server.Models.GroupMember", b =>
                {
                    b.HasOne("PVP.Server.Models.Group", null)
                        .WithMany("GroupMembers")
                        .HasForeignKey("GroupID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PVP.Server.Models.HabitUser", b =>
                {
                    b.HasOne("PVP.Server.Models.Habit", null)
                        .WithMany("HabitUser")
                        .HasForeignKey("HabitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PVP.Server.Models.User", null)
                        .WithMany("HabitUser")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PVP.Server.Models.Like", b =>
                {
                    b.HasOne("PVP.Server.Models.Post", null)
                        .WithMany("Likes")
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PVP.Server.Models.Post", b =>
                {
                    b.HasOne("PVP.Server.Models.Group", null)
                        .WithMany("Posts")
                        .HasForeignKey("GroupID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PVP.Server.Models.WeekDay", b =>
                {
                    b.HasOne("PVP.Server.Models.Habit", "Habit")
                        .WithMany("WeekDays")
                        .HasForeignKey("HabitId");

                    b.Navigation("Habit");
                });

            modelBuilder.Entity("UserUser", b =>
                {
                    b.HasOne("PVP.Server.Models.User", null)
                        .WithMany()
                        .HasForeignKey("FriendsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PVP.Server.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PVP.Server.Models.Comment", b =>
                {
                    b.Navigation("CommentLikes");
                });

            modelBuilder.Entity("PVP.Server.Models.Group", b =>
                {
                    b.Navigation("GroupMembers");

                    b.Navigation("Posts");
                });

            modelBuilder.Entity("PVP.Server.Models.Habit", b =>
                {
                    b.Navigation("HabitUser");

                    b.Navigation("WeekDays");
                });

            modelBuilder.Entity("PVP.Server.Models.HabitUser", b =>
                {
                    b.Navigation("CheckIns");
                });

            modelBuilder.Entity("PVP.Server.Models.Post", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Likes");
                });

            modelBuilder.Entity("PVP.Server.Models.User", b =>
                {
                    b.Navigation("HabitUser");
                });
#pragma warning restore 612, 618
        }
    }
}
