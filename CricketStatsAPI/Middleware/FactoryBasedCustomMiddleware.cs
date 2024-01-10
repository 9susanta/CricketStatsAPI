namespace CricketStatsAPI.Middleware
{
    public class FactoryBasedCustomMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            Console.WriteLine("Factory Custom Middleware logic from the separate class.");
            await next.Invoke(context);
        }
    }
}
