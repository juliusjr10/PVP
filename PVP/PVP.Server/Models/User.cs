﻿using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth {  get; set; }

        public ICollection<HabitUser> HabitUser { get; } = [];
        public List<Group> Groups { get; } = [];


    }
}
