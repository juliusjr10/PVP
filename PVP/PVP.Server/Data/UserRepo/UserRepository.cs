using PVP.Server.Models;
using System.Linq;

namespace PVP.Server.Data.UserRepo
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public User Create(User user)
        {
            _context.Users.Add(user);
            user.Id = _context.SaveChanges();

            return user;
        }
        public bool IsUsername(string username)
        {
            bool isUsername = true;
            if(_context.Users.FirstOrDefault(u => u.Username == username) == null) 
                isUsername = false;

            return isUsername;
        }
        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User GetByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }

        public User GetByPasswordResetToken(string passwordResetToken)
        {
            return _context.Users.FirstOrDefault(u => u.PasswordResetToken == passwordResetToken);
        }

        public User Update(User user)
        {
            _context.Users.Update(user);
            user.Id = _context.SaveChanges();

            return user;
        }
    }
}
