using CricketStatsAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CricketStatsAPI.Repository
{
    public class UsersRepository
    {
        private readonly StatusContext _statusContext;

        public UsersRepository(StatusContext statusContext)
        {
            _statusContext = statusContext;
        }
        public async Task<bool> RegisterUser(AppUser user)
        {
            await _statusContext.AddAsync(user);
            int i=await _statusContext.SaveChangesAsync();
            if (i > 0)
            {
                return true;
            }
            return false;
        }
        public async Task<bool> LoginUser(AppUser user)
        {
            return await _statusContext.AppUsers.Where(u =>
           (u.Email == user.Email) && (u.Password == user.Password)).AnyAsync();

        }
        public async Task<bool> UpdateRefreshToken(AppUser user)
        {
            var _user = await UserByEamil(user.Email);
            _user.RefreshToken= user.RefreshToken;
            _user.RefreshTokenExpiryTime = user.RefreshTokenExpiryTime;
            return _statusContext.SaveChanges()>0;

        }
        public async Task<AppUser> UserByEamil(string email)
        {
            return (await _statusContext.AppUsers.FirstOrDefaultAsync(u => u.Email == email));
        }

        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv0123456789")); // Replace with your secret key
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = "statsApp",
                Audience= "https://localhost:7187/",
                Expires = DateTime.UtcNow.AddMinutes(20), // Set the short lived token.
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                IssuedAt = DateTime.UtcNow,
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv0123456789"));

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = "statsApp",
                ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");
            return principal;
        }
    }
}
