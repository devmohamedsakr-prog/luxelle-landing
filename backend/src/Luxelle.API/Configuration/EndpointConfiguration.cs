namespace Luxelle.API.Configuration;

public static class EndpointConfiguration
{
    public static WebApplication MapCustomEndpoints(this WebApplication app)
    {
        // Health check endpoint
        app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

        // Error endpoint
        app.MapGet("/error", () => Results.Problem("An error occurred", statusCode: 500));

        return app;
    }
}
