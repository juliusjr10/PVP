using System.Data.OleDb;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using PVP.Server.Data;
using PVP.Server.Dtos;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Helpers.Services;
using PVP.Server.Models;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : Controller
    {
        private readonly IGroupService _groupService;
        private readonly JwtService _jwtService;
        private readonly AppDbContext _context;
        public GroupController(IGroupService groupService, JwtService jwtService, AppDbContext context)
        {
            _groupService = groupService;
            _jwtService = jwtService;
            _context = context;
        }
        [HttpPost("addgroupmember")]
        public async Task<ActionResult<Group>> AddGroupMember(AddGroupMemberDTO dto)
        {
            var jwt = Request.Cookies["jwt"];
            if (jwt == null)
            {
                return Unauthorized();
            }
            var token = _jwtService.Verify(jwt);
            if (token == null)
            {
                return Unauthorized();
            }
            int userID = int.Parse(token.Issuer);
            var result = await _groupService.AddGroupMember(dto, userID);
            if (result == null)
            {
                return BadRequest(new { message = "Couldn't add user to group" });
            }
            return Ok(result);
        }
        [HttpPost("creategroup")]
        public async Task<ActionResult<Group>> CreateGroup(CreateGroupDTO dto)
        {
            var jwt = Request.Cookies["jwt"];
            if (jwt == null)
            {
                return Unauthorized();
            }
            var token = _jwtService.Verify(jwt);
            if (token == null)
            {
                return Unauthorized();
            }
            int userID = int.Parse(token.Issuer);
            var result = await _groupService.CreateGroup(dto, userID);
            if (result == null)
            {
                return BadRequest(new { message = "Failed to create group" });
            }
            return Ok(result);
        }
        [HttpPost("deletegroup")]
        public async Task<ActionResult<Group>> DeleteGroup(DeleteGroupDTO dto)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }
                var token = _jwtService.Verify(jwt);
                if (token == null)
                {
                    return Unauthorized();
                }
                int userID = int.Parse(token.Issuer);
                var result = await _groupService.DeleteGroup(dto, userID);
                if (result == true)
                {
                    return Ok(new { message = "Group removed successfully." });
                }
                else if (result == false)
                {
                    return NotFound(new { message = "Group not found or you are not authorized to remove it." });
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while removing the group." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while removing the group." });
            }
        }
        [HttpGet]
        public async Task<ActionResult<ICollection<Group>>> GetAllGroups()
        {
            var jwt = Request.Cookies["jwt"];
            if (jwt == null)
            {
                return Unauthorized();
            }
            var token = _jwtService.Verify(jwt);
            if (token == null)
            {
                return Unauthorized();
            }
            var result = await _groupService.GetAllGroups();
            if (result == null)
            {
                return BadRequest(new { message = "Failed to retrieve groups." });
            }
            return Ok(result);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Group>> GetGroupById(int id)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }
                var token = _jwtService.Verify(jwt);
                if (token == null)
                {
                    return Unauthorized();
                }
                var result = await _groupService.GetGroupById(id);
                if (result == null) { return NotFound(); }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving group");
            }
        }
        [HttpPost("getgroupmembers")]
        public async Task<ActionResult<ICollection<GroupMember>>> GetGroupMembers(GetGroupMembersDTO dto)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }
                var token = _jwtService.Verify(jwt);
                if (token == null)
                {
                    return Unauthorized();
                }
                var result = await _groupService.GetGroupMembers(dto);
                if (result == null) { return NotFound(); }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving group members");
            }
        }
        [HttpPost("updategroup")]
        public async Task<ActionResult<Group>> UpdateGroup(UpdateGroupDTO dto)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }
                var token = _jwtService.Verify(jwt);
                if (token == null)
                {
                    return Unauthorized();
                }
                int userID = int.Parse(token.Issuer);
                
                var result = await _groupService.UpdateGroup(dto, userID);

                if (result != null) { return Ok(result); }
                else
                {
                    return NotFound(new { message = "Group not found or you are not authorized to edit it." });
                }
            }
            catch (Exception ex) {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating group");
            }
        }
        [HttpGet("getusergroups")]
        public async Task<ActionResult<IEnumerable<Group>>> GetUserGroups()
        {
            var jwt = Request.Cookies["jwt"];
            if (jwt == null)
            {
                return Unauthorized();
            }
            var token = _jwtService.Verify(jwt);
            if (token == null)
            {
                return Unauthorized();
            }
            int userID = int.Parse(token.Issuer);

            // Query the database to fetch groups where the authenticated user is a member
            var groups = await _context.Groups
                .Where(g => g.GroupMembers.Any(m => m.UserID == userID))
                .ToListAsync();

            return groups;
        }
        [HttpPost("isuseringroup")]
        public async Task<ActionResult<bool>> IsUserInGroup(IsUserInGroupDTO dto)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }
                var token = _jwtService.Verify(jwt);
                if (token == null)
                {
                    return Unauthorized();
                }
                int userID = int.Parse(token.Issuer);

                // Check if the user is a member of the specified group
                var isMember = await _context.GroupMembers
                    .FirstOrDefaultAsync(gm => gm.GroupID == dto.GroupID && gm.UserID == userID);

                return Ok(isMember);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error checking user's membership in the group");
            }
        }
        [HttpPost("leavegroup/{groupid}")]
        public async Task<ActionResult<bool>> LeaveGroup(int groupid)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }
                var token = _jwtService.Verify(jwt);
                if (token == null)
                {
                    return Unauthorized();
                }
                int userID = int.Parse(token.Issuer);

                await _groupService.LeaveGroup(groupid, userID);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error leaving group");
            }
        }
    }


}
