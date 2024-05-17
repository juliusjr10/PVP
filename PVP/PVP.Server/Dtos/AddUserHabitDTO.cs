using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class AddUserHabitDTO
    {
        [Required]
        public int HabitId { get; set; }

        public bool IsGoal { get; set; }  // Indicates if it's a GoalHabitUser

        // Properties for GoalHabitUser
        public int Goal { get; set; }     // New property for the goal
        public string Frequency { get; set; } // New property for frequency
        public string Time { get; set; }      // New property for time
    }
}
