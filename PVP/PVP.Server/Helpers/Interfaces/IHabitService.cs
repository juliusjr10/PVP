using PVP.Server.Dtos;
using PVP.Server.Models;

namespace PVP.Server.Helpers.Interfaces
{
    public interface IHabitService
    {
        Task<HabitUser?> AddUserHabit(int userId, int habitId);
        Task<ICollection<HabitUser>> GetAllUserHabits(int userId);
        Task<CheckIn> CheckIn(CheckInDTO dto, int userId);
        Task<ICollection<Habit>> GetAllHabits();
        Task<ICollection<CheckIn>> GetUserHabitCheckins(int userId, int habitId);

        Task<ICollection<Habit>> GetHabitByName(string name);
    }
}
