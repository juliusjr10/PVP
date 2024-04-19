using PVP.Server.Models;

namespace PVP.Server.Dtos
{
    public class CreateGroupDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public PrivacyLevel PrivacyLevel { get; set; }
    }
}
