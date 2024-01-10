using CricketStatsAPI.Middleware;
using Microsoft.AspNetCore.Builder;

namespace CricketStatsAPI
{
    public static class MiddlewareExtension
    {
        public static IApplicationBuilder UseCustomMiddlware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<CustomMiddleware>();
        }

        public static IApplicationBuilder UseFactoryCustomMiddlware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<FactoryBasedCustomMiddleware>();
        }
    }
}
