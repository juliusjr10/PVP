using System.Text.Json.Serialization;

namespace PVP.Server.Models
{
    public class Challenge
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ChallengeType ChallengeType { get; set; }

        public ChallengeStatus ChallengeStatus { get; set; }
        public DateTime ChallengeStart { get; set; }
        public int FirstChallengerId { get; set; }
        [JsonIgnore]
        public User FirstChallenger { get; set; }

        public int SecondChallengerId { get; set; }
        [JsonIgnore]
        public User SecondChallenger { get; set; }

        public int HabitId { get; set; }
        [JsonIgnore]
        public Habit Habit { get; set; }

        public int? FirstChallengerStreak { get; set; }
        public int? SecondChallengerStreak { get;set; }



    }

    public enum ChallengeStatus
    {
        InProgress,
        FirstChallengerWon,
        SecondChallengerWon,
        Tie,

    }
}
