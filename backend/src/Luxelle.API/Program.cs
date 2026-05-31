using Luxelle.API.Configuration;

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddApplicationServices();
    builder.Services.AddCorsPolicy();
    builder.Services.AddDatabaseContext(builder.Configuration);
    builder.Services.AddRepositoriesAndServices();
    builder.Services.AddStripeServices(builder.Configuration);
    builder.Services.AddJwtAuthentication(builder.Configuration);

    var app = builder.Build();

    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogInformation("Application starting...");
    logger.LogInformation("Environment: {Environment}", app.Environment.EnvironmentName);

    try
    {
        await app.InitializeDatabaseAsync();
    }
    catch (Exception dbEx)
    {
        logger.LogError(dbEx, "Database initialization failed - app will continue");
    }

    app.UseResponseCompression();
    app.UseSwaggerUI();
    app.UseExceptionHandler("/error");
    app.UseCorsPolicy();
    app.UseOutputCache();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.MapCustomEndpoints();

    logger.LogInformation("Application started successfully");
    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine($"Fatal error: {ex}");
    Console.WriteLine($"Stack trace: {ex.StackTrace}");
    Environment.Exit(1);
}
