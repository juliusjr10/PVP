using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Models
{
    public class HabitUser
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int HabitId { get; set; }
        public ICollection<CheckIn> CheckIns { get; } = [];


    }
}
