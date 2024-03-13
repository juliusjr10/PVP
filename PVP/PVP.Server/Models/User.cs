using System.ComponentModel.DataAnnotations;

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

        public List<Habit> Habits { get; } = [];


    }
}
