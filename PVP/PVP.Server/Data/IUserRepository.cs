using PVP.Server.Models;

namespace PVP.Server.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);

        User GetById(int id);
    }
}
