using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using PVP.Server.Data.UserRepo;
using PVP.Server.Dtos;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Helpers.Services;
using PVP.Server.Models;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        private readonly IEmailService _emailSender;
        public AuthController(IUserRepository repository, JwtService jwtService, IEmailService emailSenderService)
        {
            _repository = repository;
            _jwtService = jwtService;
            _emailSender = emailSenderService;
        }
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Lastname = dto.Lastname,
                Username = dto.Username,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                DateOfBirth = dto.DateOfBirth
            };
            if (_repository.IsUsername(dto.Username) == false)
            {
                return Created("success", _repository.Create(user));
            }
            else return BadRequest("Duplicate username");
        }
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Invalid Credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });

        }
        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

                return Ok(user);
            } catch (Exception _)
            {
                return Unauthorized();
            }
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpPost("forgotpassword")]
        public IActionResult ForgotPassword(string email)
        {
            var user = _repository.GetByEmail(email);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            user.PasswordResetToken = CreateRandomToken();
            user.ResetTokenExpires = DateTime.Now.AddDays(1);

            _repository.Update(user);
            _emailSender.SendEmail(email, "Password reset",
                "<html>" +
                "<body>" +
                "<h3>Reset your password!</h3><br>" +
                "Press this <a href=\"https://localhost:5173/resetpassword/" + user.PasswordResetToken + "\">link</a> to reset your password!" +
                "</body>" +
                "</html>"
                );


            return Ok("You may now reset your password");
        }

        [HttpPost("resetpassword")]
        public IActionResult ResetPassword(ResetPasswordDto dto)
        {

            var user = _repository.GetByPasswordResetToken(dto.Token);
            if (user == null || user.ResetTokenExpires < DateTime.Now)
            {
                return BadRequest("Invalid token");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.PasswordResetToken = null;
            user.ResetTokenExpires = null;

            _repository.Update(user);

            return Ok("Password reset");
        }

        [HttpPost("edituser")]
        public IActionResult EditUser(UserEditDto dto)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int id = int.Parse(token.Issuer);
                var user = _repository.GetById(id);

                if (dto.Name != null) user.Name = dto.Name;
                if (dto.Lastname != null) user.Lastname = dto.Lastname;
                _repository.Update(user);
                return Ok(user);
            }
            catch (Exception _)
            {
                return Unauthorized();
            }
        }

        [HttpPost("changepassword")]
        public IActionResult ChangePassword(ChangePasswordDto dto)
        {

            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int id = int.Parse(token.Issuer);
                var user = _repository.GetById(id);

                if (dto.NewPassword != null && dto.RepeatNewPassword != null && dto.RepeatNewPassword == dto.NewPassword && BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
                    _repository.Update(user);
                    Response.Cookies.Delete("jwt");
                }
                else
                {
                    return BadRequest("Invalid data");
                }
                return Ok("Password changed");

            }
            catch (Exception _)
            {
                return Unauthorized();
            }
        }
        [HttpGet("user/{userid}")]
        public ActionResult<User> User(int userid)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                var user = _repository.GetById(userid);

                return user;
            }
            catch (Exception _)
            {
                return Unauthorized();
            }
        }
        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
    }
}
