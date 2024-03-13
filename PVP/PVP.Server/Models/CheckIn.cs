using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Models
{
    public class CheckIn
    {
        [Key]
        public int Id { get; set; }
        public Mood Mood { get; set; }

        public DateTime Date { get; set; }
        public string Note { get; set; }
        
        public int? UserHabitId { get; set; }
        public UserHabit? UserHabit { get; set; }

    }
}
