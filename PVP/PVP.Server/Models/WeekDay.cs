using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Models
{
    public class WeekDay
    {
        [Key]
        public int Id { get; set; }
        public int? HabitId { get; set; }
        public Habit? Habit { get; set; }
        public string Name { get; set; }


    }
}
