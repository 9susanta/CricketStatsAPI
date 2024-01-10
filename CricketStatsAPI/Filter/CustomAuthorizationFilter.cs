using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CricketStatsAPI.Filter
{
    public class CustomAuthorizationFilter : IAuthorizationFilter
    {
        private readonly string _rights;
        public CustomAuthorizationFilter(string rights)
        {
            _rights = rights;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var currentUser=context.HttpContext.User;
            bool isAuthorized = _rights == "Read";
            if (!isAuthorized)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}
