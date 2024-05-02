using MimeKit;
using MimeKit.Text;
using System.Net;
using System.Net.Mail;
using PVP.Server.Data;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Models;
using PVP.Server.Dtos;
using PVP.Server.Helpers.Interfaces;

namespace PVP.Server.Helpers.Services
{
    public class GroupService : IGroupService
    {
        private readonly AppDbContext _context;

        public GroupService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<GroupMember?> AddGroupMember(AddGroupMemberDTO dto, int userid)
        {
            if (dto == null)
            {
                return null;
            }
            var member = new GroupMember
            {
                GroupID = dto.GroupID,
                UserID = userid,
                JoinDate = DateTime.Now,
            };
            await _context.GroupMembers.AddAsync(member);
            await _context.SaveChangesAsync();
            return member;
        }

        public async Task<Group?> CreateGroup(CreateGroupDTO dto, int userid)
        {
            if (dto == null)
            {
                return null;
            }
            var newGroup = new Group
            {
                Name = dto.Name,
                Description = dto.Description,
                PrivacyLevel = dto.PrivacyLevel,
                AdminUserID = userid,
                CreationDate = DateTime.Now,
            };
            await _context.Groups.AddAsync(newGroup);
            await _context.SaveChangesAsync();

            var groupMember = new GroupMember
            {
                GroupID = newGroup.GroupID,
                UserID = userid,
                RoleLevel = RoleLevel.Admin,
                JoinDate = DateTime.Now,
            };

            await _context.GroupMembers.AddAsync(groupMember);

            await _context.SaveChangesAsync();

            return newGroup;
        }

        public async Task<bool?> DeleteGroup(DeleteGroupDTO dto, int userid)
        {
            if (dto == null) { return null; }
            try
            {
                var group = await _context.Groups
                    .Include(w => w.GroupMembers)
                    .FirstOrDefaultAsync(w => w.GroupID == dto.GroupID);
                if (group == null || group.AdminUserID != userid)
                {
                    return false;
                }
                _context.Groups.Remove(group);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return true;
            }
        }

        public async Task<ICollection<Group>?> GetAllGroups()
        {
            var groups = await _context.Groups
                .Include(w => w.GroupMembers)
                .ToListAsync();
            if (groups == null) { return null; }
            return groups;
        }

        public async Task<Group?> GetGroupById(int id)
        {
            var group = await _context.Groups
                .Include(w => w.GroupMembers)
                .FirstOrDefaultAsync(w => w.GroupID == id);
            if (group == null) { return null; }
            return group;
        }

        public async Task<ICollection<GroupMember>?> GetGroupMembers(GetGroupMembersDTO dto)
        {
            if (dto == null) { return null; }
            var group = await _context.Groups
                .Include(w => w.GroupMembers)
                .FirstOrDefaultAsync(w => w.GroupID == dto.GroupID);
            if (group == null) { return null; }
            return group.GroupMembers;
        }

        public async Task<GroupMember?> LeaveGroup(int groupid, int userid)
        {
            try
            {
                var groupmember = _context.GroupMembers.FirstOrDefault(w => w.GroupID == groupid && w.UserID == userid);
                if (groupmember == null) { return null; }
                _context.GroupMembers.Remove(groupmember);
                await _context.SaveChangesAsync();
                return groupmember;
            }
            catch (Exception ex) { return null; }
        }

        public async Task<Group?> UpdateGroup(UpdateGroupDTO dto, int userid)
        {
            if (dto == null)
            {
                return null;
            }
            try
            {
                var group = await _context.Groups
                    .FirstOrDefaultAsync(w => w.GroupID == dto.GroupID);
                if (group == null || group.AdminUserID != userid)
                {
                    return null;
                }
                group.Name = dto.Name;
                group.Description = dto.Description;
                group.PrivacyLevel = dto.PrivacyLevel;
                _context.Entry(group).State = EntityState.Modified;
                _context.Update(group);
                await _context.SaveChangesAsync();
                return group;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
    }
}
