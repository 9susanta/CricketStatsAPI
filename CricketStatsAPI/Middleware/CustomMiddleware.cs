namespace CricketStatsAPI.Middleware
{
    public class CustomMiddleware
    {
        private readonly RequestDelegate nextRequest;
        public CustomMiddleware(RequestDelegate requestDelegate)
        {
            this.nextRequest = requestDelegate;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            Console.WriteLine("Custom Middleware logic from the separate class.");
            await nextRequest.Invoke(httpContext);
        }
    }

}
