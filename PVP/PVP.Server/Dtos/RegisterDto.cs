using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Lastname is required")]
        public string Lastname { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [MinLength(6)]
        [MaxLength(20)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required"), EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6)]
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
