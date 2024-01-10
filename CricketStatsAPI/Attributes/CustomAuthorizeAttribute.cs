using CricketStatsAPI.Filter;
using Microsoft.AspNetCore.Mvc;

namespace CricketStatsAPI.Attributes
{
    public class CustomAuthorizeAttribute : TypeFilterAttribute
    {
        public CustomAuthorizeAttribute(string right) : base(typeof(CustomAuthorizationFilter))
        {
            Arguments=new string[] {right};
        }
    }
}
