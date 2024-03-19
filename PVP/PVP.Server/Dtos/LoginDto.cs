using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required"), EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
