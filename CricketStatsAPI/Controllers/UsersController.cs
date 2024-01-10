using CricketStatsAPI.Model;
using CricketStatsAPI.Repository;
using CricketStatsAPI.RequestModel;
using CricketStatsAPI.ResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CricketStatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UsersController : ControllerBase
    {
        private readonly UsersRepository _usersRepository;

        public UsersController(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }
        [HttpPost]
        [Route("RegistrationUser")]
        public async Task<IActionResult> RegistrationUser(AppUser user)
        {
            var response = await _usersRepository.RegisterUser(user);

            if (response)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, "User")
                };
                var accessToken = _usersRepository.GenerateAccessToken(claims);
                var refreshToken = _usersRepository.GenerateRefreshToken();
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7).ToString("dd-MM-yyyy HH:mm");
                await _usersRepository.UpdateRefreshToken(user);
                return Ok(new AuthenticatedResponse
                {
                    Token = accessToken,
                    RefreshToken = refreshToken
                });
            }
            return BadRequest("Failed");
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(AppUser user)
        {
            var isUserValid = await _usersRepository.LoginUser(user);
            if (!isUserValid)
                return Unauthorized();

            var claims = new List<Claim>
            {
              new Claim(ClaimTypes.Email, user.Email),
              new Claim(ClaimTypes.Role, "User")
            };
            var accessToken= _usersRepository.GenerateAccessToken(claims);
            var refreshToken = _usersRepository.GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7).ToString("dd-MM-yyyy HH:mm");
            await _usersRepository.UpdateRefreshToken(user);
            return Ok(new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            });
        }
        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel is null)
                return BadRequest("Invalid client request");
            string accessToken = tokenModel.AccessToken??"";
            string refreshToken = tokenModel.RefreshToken??"";
            var principal = _usersRepository.GetPrincipalFromExpiredToken(accessToken);
            var email = principal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = await _usersRepository.UserByEamil(email);
            if (user is null || user.RefreshToken != refreshToken || DateTime.Parse(user.RefreshTokenExpiryTime) <= DateTime.Now)
                return BadRequest("Invalid client request");
            var newAccessToken = _usersRepository.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _usersRepository.GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _usersRepository.UpdateRefreshToken(user);
            return Ok(new AuthenticatedResponse()
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }
        [HttpPost, Authorize]
        [Route("revoketToken")]
        public async Task<IActionResult> RevokeRefreshToken()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = await _usersRepository.UserByEamil(email);
            if (user == null) 
                return BadRequest();
            
            user.RefreshToken = null;
            await _usersRepository.UpdateRefreshToken(user);
            return NoContent();
        }
    }
}
