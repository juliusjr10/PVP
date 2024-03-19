using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Data;
using PVP.Server.Dtos;
using PVP.Server.Helpers;
using PVP.Server.Models;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitsController : ControllerBase
    {
        private readonly IHabitService _habitService;
        private readonly JwtService _jwtService;
        public HabitsController(IHabitService habitService, JwtService jwtService)
        {
            _habitService = habitService;
            _jwtService = jwtService;
        }
        [HttpPost("addhabit")]
        public async Task<IActionResult> AddUserHabit(AddUserHabitDTO dto)
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

            var result = await _habitService.AddUserHabit(userID, dto.HabitId);
            if (result == null)
            {
                return NotFound(new { message = "Habit not found" });
            }
            return Ok(result);
        }
        [HttpGet("getuserhabits")]
        public async Task<IActionResult> GetAllUserHabits()
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
            var workouts = await _habitService.GetAllUserHabits(userID);

            if (workouts == null)
            {
                return BadRequest(new { message = "Failed to retrieve user habits." });
            }

            return Ok(workouts);

        }
        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn(CheckInDTO dto)
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
            var checkin = await _habitService.CheckIn(dto, userID);
            if (checkin == null)
            {
                return BadRequest(new { message = "Failed to check in" });
            }
            return Ok(checkin);
        }
    }
}
