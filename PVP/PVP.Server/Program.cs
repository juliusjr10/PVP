using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using PVP.Server.Data;
using PVP.Server.Data.UserRepo;
using PVP.Server.Helpers.Interfaces;
using PVP.Server.Helpers.Services;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IEmailService, EmailService>();

//Prisijungimo i duombaze varas
var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddCors();
//Builderis duombazes kontekstui
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<IHabitService, HabitService>();
builder.Services.AddScoped<IGroupService, GroupService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IFriendsService, FriendsService>();
// Configure JSON serialization options
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        //context.Database.Migrate();
        await SeedData.Seed(context);
    }
}

app.UseHttpsRedirection();

app.UseCors(options => options
    .WithOrigins(new[] { "https://localhost:5173" })
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
);
app.UseAuthorization();
app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("/index.html");

app.Run();
