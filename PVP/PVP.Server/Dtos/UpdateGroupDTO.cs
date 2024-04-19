using PVP.Server.Models;

namespace PVP.Server.Dtos
{
    public class UpdateGroupDTO
    {
        public int GroupID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public PrivacyLevel PrivacyLevel { get; set; }
    }
}
