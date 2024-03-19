using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Data;
using PVP.Server.Models;

namespace PVP.Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class HabitsController : ControllerBase
    {
        public HabitsController()
        {
        }
    }

}
