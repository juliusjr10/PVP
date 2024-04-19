using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Models
{
    public class Post
    {
        [Key]
        public int PostID { get; set; }
        public int GroupID { get; set; }
        public int UserID { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public ICollection<Comment> Comments { get; } = [];
        public ICollection<Like> Likes { get; } = [];
    }
}
