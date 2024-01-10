using CricketStatsAPI.Filter;
using Microsoft.AspNetCore.Mvc;

namespace CricketStatsAPI.Attributes
{
    public class CustomResponseCacheAttribute : TypeFilterAttribute
    {
        public CustomResponseCacheAttribute() : base(typeof(CustomCacheResourceFilter))
        {
        }
    }
}
