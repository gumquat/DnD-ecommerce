using DnDStore.Backend.Data;
using DnDStore.Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Add HttpClient for DnD API
builder.Services.AddHttpClient<DndApiService>();

// Register DbContext with PostgreSQL using connection string
builder.Services.AddDbContext<DnDStoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Changed from IdentityUser to ApplicationUser
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

// Add CORS policy for React app to access API endpoints
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:5000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add Swagger configuration - moved before app.Build()
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "DnDStore API", Version = "v1" });
});

var app = builder.Build();

// Use CORS policy
app.UseCors("AllowAllOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "DnDStore API v1");
    });
}

public class ApiResponse
{
    public int Count { get; set; }
    public List<ApiResult> Results { get; set; }
}

public class ApiResult
{
    public string Index { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
}

app.UseAuthorization();

app.MapControllers();

app.Run();