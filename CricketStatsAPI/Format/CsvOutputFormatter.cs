using Microsoft.AspNetCore.Mvc.Formatters;
using System.Collections;
using System.Globalization;
using System.Text;

namespace CricketStatsAPI.Format
{
    public class CsvOutputFormatter : TextOutputFormatter
    {
        public CsvOutputFormatter()
        {
            SupportedMediaTypes.Add("text/csv");
            SupportedEncodings.Add(Encoding.UTF8);
            SupportedEncodings.Add(Encoding.Unicode);
        }
        public override async Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
        {
            var response = context.HttpContext.Response;

            var buffer = new StringBuilder();

            var data = context.Object as IEnumerable;

            if (data != null)
            {
                // Write CSV rows
                foreach (var record in data)
                {
                    buffer.Append(string.Join(",", record));
                }
            }

            await response.WriteAsync(buffer.ToString());
        }
    }
}
