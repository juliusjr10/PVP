using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PVP.Server.Models
{
    public class Group
    {
        [Key]
        public int GroupID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int AdminUserID { get; set; }
        public DateTime CreationDate { get; set; }
        public PrivacyLevel PrivacyLevel { get; set; }
        public ICollection<GroupMember> GroupMembers { get; } = [];
        public ICollection<Post> Posts { get; } = [];
    }
    public enum PrivacyLevel
    {
        Public = 0,
        InviteOnly = 1,
        Private = 2,
    }
}
