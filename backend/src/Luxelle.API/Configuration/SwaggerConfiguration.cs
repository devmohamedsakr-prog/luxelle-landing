namespace Luxelle.API.Configuration;

public static class SwaggerConfiguration
{
    public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Luxelle API v1");
            options.RoutePrefix = string.Empty;
            options.DocumentTitle = "Luxelle API";
        });

        return app;
    }
}
