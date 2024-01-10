namespace CricketStatsAPI.Extensions
{
    public static class RouterExtension
    {
        public static void RouterMapConfiguration(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapControllerRoute(
            name: "AppRoute",
            pattern: "api/{controller=Team}/{action=Index}/{id?}");

            endpoints.MapControllerRoute(
            name: "default",
            pattern: "api/{controller=Player}/{action=Index}/{id?}");
        }
    }
}
