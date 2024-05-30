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
        [HttpPost("likepost")]
        public async Task<ActionResult> LikePost(int postId, ReactionType reaction)
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
            string userId = token.Issuer;

            bool result = await _postService.LikePost(postId, userId, reaction);
            if (!result)
            {
                return BadRequest(new { message = "Failed to like post" });
            }
            return Ok(new { message = "Post liked successfully" });
        }
        [HttpGet("likecount")]
        public async Task<ActionResult<int>> GetLikesCountByReactionTypeAndPostId(int postId, ReactionType reaction)
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

            int likesCount = await _postService.GetLikesCountByReactionTypeAndPostId(postId, reaction);
            return Ok(likesCount);
        }
        [HttpDelete("deletelike")]
        public async Task<ActionResult<bool>> DeleteLikeByPostIdAndUserId(int postId)
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
            string userId = token.Issuer;
            bool result = await _postService.DeleteLikeByPostIdAndUserId(postId, userId);
            if (!result)
            {
                return BadRequest(new { message = "Failed to delete like" });
            }
            return Ok(new { message = "Like deleted successfully" });
        }
        [HttpGet("reactionscount/{postId}")]
        public async Task<ActionResult<int>> GetAllReactionsCountByPostId(int postId)
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

            int reactionsCount = await _postService.GetAllReactionsCountByPostId(postId);
            return Ok(reactionsCount);
        }
        [HttpGet("userreaction/{postId}")]
        public async Task<ActionResult<Like>> GetUserReactionOnPost(int postId)
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

            string userId = token.Issuer;

            var like = await _postService.GetUserReactionOnPost(postId, userId);
            if (like == null)
            {
                return NotFound();
            }

            return Ok(like);
        }

    }
}
