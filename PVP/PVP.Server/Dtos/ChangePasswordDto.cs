using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class ChangePasswordDto
    {
        [Required]
        public string Password { get; set; }
        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }

        [Required]
        [MinLength(6)]
        public string RepeatNewPassword { get; set; }
    }
}
