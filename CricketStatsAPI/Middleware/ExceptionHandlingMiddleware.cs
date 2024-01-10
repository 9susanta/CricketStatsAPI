using System.Net;
using System.Text.Json;

namespace CricketStatsAPI.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var response = context.Response;
            ResponseModel exModel = new ResponseModel();

            switch (exception)
            {
                case NotImplementedException ex:
                    exModel.responseCode = (int)HttpStatusCode.NotImplemented;
                    response.StatusCode = (int)HttpStatusCode.NotImplemented;
                    exModel.responseMessage = "NotImplementedException Exception";
                    break;

                case ApplicationException ex:
                    exModel.responseCode = (int)HttpStatusCode.BadRequest;
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    exModel.responseMessage = "Application Exception";
                    break;

                default:
                    exModel.responseCode = (int)HttpStatusCode.InternalServerError;
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    exModel.responseMessage = "Internal Server Error";
                    break;

            }
            var exResult = JsonSerializer.Serialize(exModel);
            await context.Response.WriteAsync(exResult);
        }
    }
}
