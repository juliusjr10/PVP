using PVP.Server.Dtos;
using PVP.Server.Models;

namespace PVP.Server.Helpers.Interfaces
{
    public interface IGroupService
    {
        Task<Group?> CreateGroup(CreateGroupDTO dto, int userid);
        Task<Group?> UpdateGroup(UpdateGroupDTO dto, int userid);
        Task<bool?> DeleteGroup(DeleteGroupDTO dto, int userid);
        Task<ICollection<Group>?> GetAllGroups();
        Task<Group?> GetGroupById(int id);
        Task<ICollection<GroupMember>?> GetGroupMembers(GetGroupMembersDTO dto);
        Task<GroupMember?> AddGroupMember(AddGroupMemberDTO dto, int userid);
        Task<GroupMember?> LeaveGroup(int groupid, int userid);
    }
}
