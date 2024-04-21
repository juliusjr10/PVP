using Microsoft.AspNetCore.Mvc;
using PVP.Server.Dtos;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Helpers.Services;
using PVP.Server.Models;

namespace PVP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly IPostService _postService;
        private readonly JwtService _jwtService;

        public PostController(IPostService postService, JwtService jwtService)
        {
            _postService = postService;
            _jwtService = jwtService;
        }

        [HttpPost("createpost")]
        public async Task<ActionResult<Post>> CreatePost(CreatePostDTO dto)
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
            var result = await _postService.CreatePost(dto, userID);
            if (result == null)
            {
                return BadRequest(new { message = "Failed to create post" });
            }
            return Ok(result);
        }
        [HttpGet("getallposts/{groupid}")]
        public async Task<ActionResult<ICollection<Post>>> GetAllPosts(int groupid)
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
            var result = await _postService.GetAllPosts(groupid);
            if (result == null)
            {
                return BadRequest(new { message = "Failed to create post" });
            }
            return Ok(result);
        }
    }
}
