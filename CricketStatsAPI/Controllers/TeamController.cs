using Asp.Versioning;
using CricketStatsAPI.Model;
using CricketStatsAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CricketStatsAPI.Controllers
{
    [ApiVersion("1.0")] 
    [ApiVersion("2.0")] 
    [Route("api/v{version:apiVersion}/[Controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly TeamRepository _teamRepository;

        public TeamController(TeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }
        [HttpGet("GetTeam")]
        [MapToApiVersion("1.0")]
        public IActionResult GetV1()
        {
            return Ok("V1 Get to be implemented");
        }
        [HttpGet("GetTeam")]
        [MapToApiVersion("2.0")]
        public IActionResult GetV2()
        {
            return Ok("V1 Get to be implemented");
        }
        [HttpPost]
        public IActionResult Post(Team team)
        {
            return Ok("V1 Get to be implemented");
        }

    }
}
