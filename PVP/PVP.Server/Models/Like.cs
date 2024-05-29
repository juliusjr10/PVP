using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Models
{
    // Define an enum for the reaction types
    public enum ReactionType
    {
        ThumbsUp,
        Love,
        Wow,
        Sad,
        Angry
    }

    public class Like
    {
        [Key]
        public int LikeId { get; set; }
        public int PostID { get; set; }
        public string UserID { get; set; }
        public DateTime Timestamp { get; set; }

        // Add the ReactionType property
        public ReactionType Reaction { get; set; }
    }
}
