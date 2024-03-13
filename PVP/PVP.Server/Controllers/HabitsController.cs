using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Data;
using PVP.Server.Models;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitsController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public HabitsController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddHabit(Habit habit)
        {
            _appDbContext.Habits.Add(habit);
            await _appDbContext.SaveChangesAsync();

            return Ok(habit);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var habits = await _appDbContext.Habits.ToListAsync();

            return Ok(habits);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Habit>> GetHabit(int id)
        {
            try
            {
                var result = await _appDbContext.Habits.FindAsync(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
    }

}
