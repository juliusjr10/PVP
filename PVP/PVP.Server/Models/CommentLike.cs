using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Models
{
    public class CommentLike
    {
        [Key]
        public int CommentLikeId { get; set; }
        public int CommentID { get; set; }
        public string UserID { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
