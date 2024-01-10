using Asp.Versioning;
using CricketStatsAPI;
using CricketStatsAPI.Controllers;
using CricketStatsAPI.Extensions;
using CricketStatsAPI.Filter;
using CricketStatsAPI.Format;
using CricketStatsAPI.Middleware;
using CricketStatsAPI.Model;
using CricketStatsAPI.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Global Error Handling Filter
builder.Services.AddControllers(options => 
{ 
    options.Filters.Add(new HttpExceptionFilter());

    options.RespectBrowserAcceptHeader = true;
    options.ReturnHttpNotAcceptable = true;
    options.FormatterMappings.SetMediaTypeMappingForFormat("txt", "text/plain");
    options.OutputFormatters.Add(new CsvOutputFormatter());
}).AddXmlSerializerFormatters();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

var connectionString = builder.Configuration.GetConnectionString("StatsDB");
builder.Services.AddDbContext<StatusContext>(opts => opts.UseSqlServer(connectionString));

builder.Services.AddScoped<TeamRepository>();
builder.Services.AddScoped<UsersRepository>();

builder.Services.AddMemoryCache();

builder.Services.AddTransient<FactoryBasedCustomMiddleware>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; 
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true, 
        ValidateAudience = true, 
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true, 
        ValidIssuer = "statsApp",
        ValidAudience = "https://localhost:7187/", 
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv0123456789"))  
    };
});

//The above JWT bearer authentication performs authentication by extracting and validating a JWT token from the Authorization request header.



builder.Services.AddApiVersioning(option =>
{
    option.AssumeDefaultVersionWhenUnspecified = true; //This ensures if client doesn't specify an API version. The default version should be considered. 
    option.DefaultApiVersion = new ApiVersion(1, 0); //This we set the default API version
    option.ReportApiVersions = true; //The allow the API Version information to be reported in the client  in the response header. This will be useful for the client to understand the version of the API they are interacting with.
    option.ApiVersionReader = ApiVersionReader.Combine(
        new QueryStringApiVersionReader("api-version"));
        //new HeaderApiVersionReader("X-Version"),
        //new MediaTypeApiVersionReader("ver")); //This says how the API version should be read from the client's request, 3 options are enabled 1.Querystring, 2.Header, 3.MediaType. 
                                               //"api-version", "X-Version" and "ver" are parameter name to be set with version number in client before request the endpoints.
}).AddApiExplorer(options => {
        options.GroupNameFormat = "'v'VVV"; //The say our format of our version number “‘v’major[.minor][-status]”
        options.SubstituteApiVersionInUrl = true; //This will help us to resolve the ambiguity when there is a routing conflict due to routing template one or more end points are same.
    });

builder.Services.AddCors(o => o.AddPolicy("ClientAllow", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseExceptionHandler("/error-development");
}
else
{
    //app.UseExceptionHandler("/error");
}
app.UseHttpsRedirection();
app.UseCors("ClientAllow");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    //Conventional Route
    endpoints.RouterMapConfiguration();

    // Attribute Routing (Controllers)
    endpoints.MapControllers();
});



//app.UseExceptionHandler(exceptionHandlerApp =>
//{
//    exceptionHandlerApp.Run(async context =>
//    {
//        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

//        context.Response.ContentType = Text.Plain; //You can change it to "application/json". if you have any json data that need to pass

//        await context.Response.WriteAsync("An exception was thrown.");

//        var exceptionHandlerPathFeature =
//            context.Features.Get<IExceptionHandlerPathFeature>();

//        if (exceptionHandlerPathFeature != null)
//        {


//            await context.Response.WriteAsync("{Error:Internal Server Error}");
//        }
//    });
//});
//app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseCustomMiddlware();

app.UseFactoryCustomMiddlware();

app.Run();
