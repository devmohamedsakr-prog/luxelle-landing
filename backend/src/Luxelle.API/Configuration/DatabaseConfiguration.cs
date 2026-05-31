using Luxelle.Infrastructure.Data;
using Luxelle.Infrastructure.Data.Seeds;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.API.Configuration;

public static class DatabaseConfiguration
{
    public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration.");
        }

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(connectionString, sqlOptions =>
            {
                sqlOptions.CommandTimeout(30);
                sqlOptions.EnableRetryOnFailure(maxRetryCount: 3);
            });
        });

        return services;
    }

    public static async Task InitializeDatabaseAsync(this IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices.CreateScope())
        {
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                logger.LogInformation("Checking database connection...");
                
                // Test connection with timeout
                using (var cts = new System.Threading.CancellationTokenSource(TimeSpan.FromSeconds(10)))
                {
                    var canConnect = await db.Database.CanConnectAsync(cts.Token);
                    if (!canConnect)
                    {
                        logger.LogWarning("Cannot connect to database - will retry on next request");
                        return;
                    }
                }
                
                logger.LogInformation("Database connection successful");
                
                // Create database if it doesn't exist
                logger.LogInformation("Ensuring database is created...");
                await db.Database.EnsureCreatedAsync();

                // Runtime seed: ensure full service catalogue + pricing tiers
                logger.LogInformation("Running runtime data seeder...");
                await RuntimeDataSeeder.SeedAsync(db);

                // Verify tables
                var users    = await db.Users.CountAsync();
                var services = await db.Services.CountAsync();
                var bookings = await db.Bookings.CountAsync();
                var pricing  = await db.PricingTiers.CountAsync();

                logger.LogInformation(
                    "Database ready — Users: {U}, Services: {S}, Bookings: {B}, PricingTiers: {P}",
                    users, services, bookings, pricing);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error during database initialization - app will continue");
                // Don't throw - allow app to start even if DB init fails
                // This allows the /health endpoint to work for diagnostics
            }
        }
    }
}
