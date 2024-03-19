using System.ComponentModel.DataAnnotations;

namespace PVP.Server.Dtos
{
    public class UserEditDto
    {
        public string? Name { get; set; }

        public string? Lastname { get; set; }

        [MinLength(1)]
        [MaxLength(20)]
        public string? Username { get; set; }

        [MinLength(6)]
        public string? Password { get; set; }
        [MinLength(6)]
        public string? ConfirmPassword { get; set; }

    }
}
