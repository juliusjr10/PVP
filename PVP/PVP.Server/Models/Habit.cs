using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Models
{
    public class Habit
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<HabitUser> HabitUser { get;} = [];

        public ICollection<WeekDay> WeekDays { get;} = new List<WeekDay>();
    }
}
