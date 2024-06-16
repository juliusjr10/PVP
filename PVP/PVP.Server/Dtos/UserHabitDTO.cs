using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class UserHabitDTO
    {
        public int Id { get; set; }
        public string HabitName { get; set; }
        public int Goal { get; set; }
        public string Frequency { get; set; }
        public string Time { get; set; }
    }
}
