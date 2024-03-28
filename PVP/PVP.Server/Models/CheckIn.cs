using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Models
{
    public class CheckIn
    {
        [Key]
        public int Id { get; set; }
        public int HabitUserId { get; set; }
        public Mood Mood { get; set; }

        public DateTime Date { get; set; }
        public string? Note { get; set; }
    }

    public enum Mood
    {
        Awful,
        Bad,
        Meh,
        Good,
        Excellent

    }
}
