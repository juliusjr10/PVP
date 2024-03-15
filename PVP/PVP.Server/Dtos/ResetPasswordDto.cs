using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class ResetPasswordDto
    {
        [Required(ErrorMessage = "Password is required")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string ConfirmNewPassword { get; set; }

        public string Token { get; set; }
    }
}
