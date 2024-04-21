using Microsoft.AspNetCore.Mvc;
using PVP.Server.Helpers;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : Controller
    {
        private readonly IFriendsService _friendsService;
        private readonly JwtService _jwtService;

        public FriendsController(IFriendsService friendsService, JwtService jwtService)
        {
            _friendsService = friendsService;
            _jwtService = jwtService;
        }

        [HttpGet]
        public async Task<IActionResult> Friends()
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
            var friends = await _friendsService.GetAllFriends(userID);

            if (friends == null)
            {
                return BadRequest(new { message = "Failed to retrieve user friends." });
            }

            return Ok(friends);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFriend(int friendId)
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

            bool success = await _friendsService.AddFriend(userID, friendId);

            if (!success)
            {
                return BadRequest(new { message = "Failed to add friend." });
            }

            return Ok(new { message = "Friend added successfully." });
        }

        [HttpPost("createfriendrequest")]
        public async Task<IActionResult> CreateFriendRequest(int receiverId)
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

            int senderId = int.Parse(token.Issuer);

            bool success = await _friendsService.CreateFriendRequest(senderId, receiverId);

            if (!success)
            {
                return BadRequest(new { message = "Failed to create friend request." });
            }

            return Ok(new { message = "Friend request sent successfully." });
        }

        [HttpGet("requests")]
        public async Task<IActionResult> GetFriendRequests()
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

            int userId = int.Parse(token.Issuer);

            var friendRequests = await _friendsService.GetFriendRequests(userId);

            if (friendRequests == null)
            {
                return BadRequest(new { message = "Failed to retrieve friend requests." });
            }

            return Ok(friendRequests);
        }

        [HttpPost("acceptrequest/{requestId}")]
        public async Task<IActionResult> AcceptFriendRequest(int requestId)
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

            bool success = await _friendsService.AcceptFriendRequest(requestId);

            if (!success)
            {
                return BadRequest(new { message = "Failed to accept friend request." });
            }

            return Ok(new { message = "Friend request accepted successfully." });
        }

        [HttpPost("declinerequest/{requestId}")]
        public async Task<IActionResult> DeclineFriendRequest(int requestId)
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

            bool success = await _friendsService.DeclineFriendRequest(requestId);

            if (!success)
            {
                return BadRequest(new { message = "Failed to decline friend request." });
            }

            return Ok(new { message = "Friend request declined successfully." });
        }
    }
}