using Microsoft.AspNetCore.Mvc;
using PVP.Server.Data.UserRepo;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Helpers.Services;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : Controller
    {
        private readonly IFriendsService _friendsService;
        private readonly IUserRepository _userRepo;
        private readonly JwtService _jwtService;

        public FriendsController(IFriendsService friendsService, JwtService jwtService, IUserRepository userRepository)
        {
            _friendsService = friendsService;
            _jwtService = jwtService;
            _userRepo = userRepository;
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
        public async Task<IActionResult> CreateFriendRequest(string username)
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
            if(_userRepo.GetByUsername(username) == null)
            {
                return BadRequest(new { message = "There is no user with this username." });
            }
            int receiverId = _userRepo.GetByUsername(username).Id;

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

        [HttpDelete("delete/{friendId}")]
        public async Task<IActionResult> DeleteFriend(int friendId)
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

            bool success = await _friendsService.DeleteFriend(userId, friendId);

            if (!success)
            {
                return BadRequest(new { message = "Failed to delete friend." });
            }

            return Ok(new { message = "Friend deleted successfully." });
        }

        [HttpGet("{friendId}")]
        public async Task<IActionResult> GetFriendById(int friendId)
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

            // Call the service method to get the friend by ID
            var friend = await _friendsService.GetFriendById(userId, friendId);

            if (friend == null)
            {
                return NotFound(new { message = "Friend not found." });
            }

            return Ok(friend);
        }
    }
}