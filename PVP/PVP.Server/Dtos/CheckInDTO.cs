using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class CheckInDTO
    {
        [Required]
        public int HabitId { get; set; }
        [Required]
        public int Mood { get; set; }

        public string? Note { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
