using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CricketStatsAPI.Model
{
    public class AppUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }  
        public string? Name { get; set; }
        public string? Email { get; set; }   
        public string? Password { get; set; }
        public string? RefreshToken { get; set; }
        public string? RefreshTokenExpiryTime { get; set; }
    }
}
