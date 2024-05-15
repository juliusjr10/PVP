using PVP.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Dtos
{
    public class CreateChallengeRequestDTO
    {
        [Required]
        public int ReceiverId { get; set; }
        public string Name { get; set; }

        [Required]  
        public ChallengeType ChallengeType { get; set; }

    }
}
