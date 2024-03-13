using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Data;
using PVP.Server.Models;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeekDaysController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public WeekDaysController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddWeekDay(WeekDay weekday)
        {
            _appDbContext.WeekDays.Add(weekday);
            await _appDbContext.SaveChangesAsync();

            return Ok(weekday);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var weekdays = await _appDbContext.WeekDays.ToListAsync();

            return Ok(weekdays);
        }
    }

}
