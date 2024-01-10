using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;

namespace CricketStatsAPI.Filter
{
    public class CustomCacheResourceFilter : IResourceFilter
    {
        private readonly IMemoryCache _cache;

        public CustomCacheResourceFilter(IMemoryCache cache)
        {
            _cache = cache;
        }
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            if (_cache.TryGetValue(context.HttpContext.Request.Path, out var cachedResult))
            {
                if (cachedResult is string cachedStringResult)
                {
                    context.Result = new ContentResult
                    {
                        Content = cachedStringResult,
                        StatusCode = 200,
                        ContentType = "text/plain"
                    };
                }
            }
        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {
            if (context.Result is ContentResult contentResult)
            {
                _cache.Set(context.HttpContext.Request.Path, contentResult.Content, TimeSpan.FromMinutes(5));
            }
        }
    }
}
