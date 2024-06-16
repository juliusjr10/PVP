using PVP.Server.Dtos;
using PVP.Server.Models;

namespace PVP.Server.Helpers.Interfaces
{
    public interface IHabitService
    {
        Task<HabitUser?> AddUserHabit(int userId, int habitId, bool isGoal = false, int goal = 0, string frequency = "", string time = "");
        Task<ICollection<HabitUser>> GetAllUserHabits(int userId);
        Task<CheckIn> CheckIn(CheckInDTO dto, int userId);
        Task<ICollection<Habit>> GetAllHabits();
        Task<ICollection<CheckIn>> GetUserHabitCheckins(int userId, int habitId);

        Task<ICollection<Habit>> GetHabitByName(string name);
        Task<bool> DeleteHabit(int userId, int habitId);
        Task<Habit?> GetHabitById(int habitId);
        Task<(int? Goal, string Frequency, string Time)?> GetGoalFrequencyTimeByHabitUserId(int habitUserId);
        Task<int?> GetHabitUserIdByHabitIdAndUserId(int userId, int habitId);
        Task<ICollection<(string Note, DateTime Date)>> NotesByUserIdAndHabitId(int userId, int habitId);

    }
}
