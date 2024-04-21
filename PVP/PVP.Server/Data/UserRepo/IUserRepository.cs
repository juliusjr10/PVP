using PVP.Server.Models;

namespace PVP.Server.Data.UserRepo
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);

        User GetById(int id);

        User Update(User user);

        User GetByPasswordResetToken(string passwordResetToken);

        User GetByUsername(string username);
        bool IsUsername(string username);
    }
}
