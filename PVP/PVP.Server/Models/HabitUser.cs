using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace PVP.Server.Models
{
    public class HabitUser
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int HabitId { get; set; }
        public int Goal { get; set; }
        public string Frequency { get; set; }
        public string Time { get; set; }
        public ICollection<CheckIn> CheckIns { get; } = new List<CheckIn>();
    }
}
