using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Models
{
    public class UserHabit
    {
        public int HabitId { get; set; }
        public string UserId { get; set; }

        public ICollection<CheckIn> CheckIns { get; } = [];


    }
}
