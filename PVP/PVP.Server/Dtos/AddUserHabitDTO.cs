using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class AddUserHabitDTO
    {
        [Required]
        public int HabitId { get; set; }
    }
}
