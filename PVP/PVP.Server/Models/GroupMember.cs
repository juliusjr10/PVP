using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace PVP.Server.Models
{
    public class GroupMember
    {
        [Key]
        public int GroupMemberID { get; set; }
        public int GroupID { get; set; }
        public int UserID { get; set; }
        public RoleLevel RoleLevel { get; set; }
        public DateTime JoinDate { get; set; }
    }
    public enum RoleLevel
    {
        Regular = 0,
        Moderator = 1,
        Admin = 2,
    }
}
