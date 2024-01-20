using Microsoft.EntityFrameworkCore;

namespace CricketStatsAPI.Model
{
    public class StatusContext: DbContext
    {
        public StatusContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
        }
        public DbSet<AppUser>? AppUsers { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
