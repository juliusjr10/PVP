using PVP.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Dtos
{
    public class AddChallengeDTO
    {  
        public string Name { get; set; }
        [Required]
        public ChallengeType ChallengeType { get; set; }

        public DateTime ChallengeStart { get; set; }
        [Required]
        public int FirstChallengerId { get; set; }
        [Required]
        public int SecondChallengerId { get; set; }
    }
}
