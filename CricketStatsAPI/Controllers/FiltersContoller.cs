using CricketStatsAPI.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace CricketStatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiltersContoller : ControllerBase
    {
        [HttpGet]
        [CustomAuthorize("Read")]
        public IActionResult Get()
        {
            return Ok("Read Success");
        }

        [HttpPost]
        [CustomAuthorize("Write")]
        public IActionResult Post()
        {
            return Ok();
        }

        [HttpGet("GetCache")]
        [CustomResponseCache]
        public IActionResult GetCache()
        {
            return Content("Read Success : "+DateTime.Now.ToString());
        }

        [HttpPost("PostCache")]
        public IActionResult PostCache()
        {
            return Ok();
        }
        [HttpGet("GetNegotiationFile")]
        public IActionResult GetNegotiationFile()
        {
            List<string> add = new List<string>();
            add.Add("susanta0");
            add.Add("susanta1");
            add.Add("susanta2");
            add.Add("susanta3");
            
           return Ok(add);
        }
        [HttpGet("GetNegotiationCSV")]
        public IActionResult GetNegotiationCSV()
        {
            List<string> add = new List<string>();
            add.Add("susanta0");
            add.Add("susanta1");
            add.Add("susanta2");
            add.Add("susanta3");

            return Ok(add);
        }
    }
}
