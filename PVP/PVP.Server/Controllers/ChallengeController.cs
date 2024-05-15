using Microsoft.AspNetCore.Mvc;
using PVP.Server.Data.UserRepo;
using PVP.Server.Dtos;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Helpers.Services;
using PVP.Server.Models;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengeController : Controller
    {
        private readonly IChallengeService _challengeService;
        private readonly IUserRepository _userRepo;
        private readonly JwtService _jwtService;

        public ChallengeController(IChallengeService challengeService, IUserRepository userRepo, JwtService jwtService)
        {
            _challengeService = challengeService;
            _userRepo = userRepo;
            _jwtService = jwtService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddChallenge(AddChallengeDTO dto)
        {
            try
            {
                // Call the service to add the challenge
                var result = await _challengeService.AddChallenge(dto);

                if (result)
                {
                    return Ok("Challenge added successfully");
                }
                else
                {
                    return BadRequest("Failed to add challenge");
                }
            }
            catch (Exception ex)
            {
                // Log or handle any exceptions here
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("createrequest/{selectedHabitId}")]
        public async Task<IActionResult> CreateChallengeRequest(int selectedHabitId, CreateChallengeRequestDTO dto)
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
                int senderId = int.Parse(token.Issuer);
                // Call the service to create the challenge request
                var result = await _challengeService.CreateChallengeRequest(senderId, selectedHabitId, dto);

                if (result)
                {
                    return Ok("Challenge request created successfully");
                }
                else
                {
                    return BadRequest("Failed to create challenge request");
                }
            }
            catch (Exception ex)
            {
                // Log or handle any exceptions here
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("accept/{challengeRequestId}")]
        public async Task<IActionResult> AcceptChallenge(int challengeRequestId)
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
                // Call the service to accept the challenge
                var result = await _challengeService.AcceptChallenge(challengeRequestId);

                if (result)
                {
                    return Ok("Challenge accepted successfully");
                }
                else
                {
                    return BadRequest("Failed to accept challenge");
                }
            }
            catch (Exception ex)
            {
                // Log or handle any exceptions here
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("decline/{requestId}")]
        public async Task<IActionResult> DeclineChallenge(int requestId)
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

            bool success = await _challengeService.DeclineChallengeRequest(requestId);

            if (!success)
            {
                return BadRequest(new { message = "Failed to decline challenge request." });
            }

            return Ok(new { message = "Challenge request declined successfully." });
        }

        [HttpGet("requests")]
        public async Task<IActionResult> GetChallengeRequests()
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

            var friendRequests = await _challengeService.GetChallengeRequests(userId);

            if (friendRequests == null)
            {
                return BadRequest(new { message = "Failed to retrieve challenge requests." });
            }

            return Ok(friendRequests);
        }
        [HttpGet]
        public async Task<IActionResult> Challenges()
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
            var friends = await _challengeService.GetChallengesForUser(userID);

            if (friends == null)
            {
                return BadRequest(new { message = "Failed to retrieve user friends." });
            }

            return Ok(friends);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChallengeById(int id)
        {
            try
            {
                // Call the service to retrieve the challenge by its ID
                var challenge = await _challengeService.GetChallengeById(id);

                if (challenge == null)
                {
                    return NotFound(new { message = "Challenge not found" });
                }

                return Ok(challenge);
            }
            catch (Exception ex)
            {
                // Log or handle any exceptions here
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
