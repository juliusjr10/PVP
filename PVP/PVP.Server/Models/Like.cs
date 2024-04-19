using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Models
{
    public class Like
    {
        [Key]
        public int LikeId { get; set; }
        public int PostID { get; set; }
        public string UserID { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
