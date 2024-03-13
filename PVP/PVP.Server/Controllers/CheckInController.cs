using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Data;
using PVP.Server.Models;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckInController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public CheckInController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddCheckIn(CheckIn checkin)
        {
            _appDbContext.CheckIns.Add(checkin);
            await _appDbContext.SaveChangesAsync();

            return Ok(checkin);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var checkins = await _appDbContext.CheckIns.ToListAsync();

            return Ok(checkins);
        }
    }

}
