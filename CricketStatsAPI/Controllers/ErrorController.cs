using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CricketStatsAPI.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("error")]
        public ActionResult Error([FromServices] IHostEnvironment hostEnvironment)
        {
            var exceptionHandlerFeature =
                HttpContext.Features.Get<IExceptionHandlerFeature>();

            return Problem(
                detail: "Please try later...",
                title: "Sorry...");

        }
        [Route("error-development")]
        public ActionResult DevelopmentError([FromServices] IHostEnvironment hostEnvironment)
        {
            var exceptionHandlerFeature =
                HttpContext.Features.Get<IExceptionHandlerFeature>();

            return Problem(
                detail: exceptionHandlerFeature.Error.StackTrace,
                title: exceptionHandlerFeature.Error.Message);

        }
    }
}
