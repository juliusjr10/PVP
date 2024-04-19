using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        public int PostID { get; set; }
        public int UserID { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public ICollection<CommentLike> CommentLikes { get; } = [];
    }
}
