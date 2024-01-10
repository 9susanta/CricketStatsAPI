using CricketStatsAPI.Attributes;
using CricketStatsAPI.Filter;
using Microsoft.AspNetCore.Mvc;

namespace CricketStatsAPI.Controllers
{
    [TypeFilter(typeof(HttpExceptionFilter))] //Local Level Error Handling Filter
    public class PlayerController : ControllerBase
    {
        public PlayerController()
        {

        }
        [HttpGet]
        public IActionResult GetPlayer()
        {
            throw new NotImplementedException("Error in Player/GetPlayer");
            return Ok();
        }
    }
}
