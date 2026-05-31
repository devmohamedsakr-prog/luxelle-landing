using Microsoft.AspNetCore.ResponseCompression;

namespace Luxelle.API.Configuration;

public static class ServiceConfiguration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddControllers();

        services.AddResponseCompression(opts =>
        {
            opts.EnableForHttps = true;
            opts.Providers.Add<GzipCompressionProvider>();
            opts.Providers.Add<BrotliCompressionProvider>();
            opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
                ["application/json", "text/plain"]);
        });

        services.AddMemoryCache();

        services.AddOutputCache(opts =>
        {
            opts.AddBasePolicy(b => b.Expire(TimeSpan.FromMinutes(5)));
            opts.AddPolicy("services", b => b.Expire(TimeSpan.FromMinutes(10)).Tag("services"));
            opts.AddPolicy("pricing",  b => b.Expire(TimeSpan.FromMinutes(30)).Tag("pricing"));
        });

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Title       = "Luxelle API",
                Version     = "v1",
                Description = "Premium Beauty & Wellness Center API",
            });
            options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Name         = "Authorization",
                Type         = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                Scheme       = "bearer",
                BearerFormat = "JWT",
                In           = Microsoft.OpenApi.Models.ParameterLocation.Header,
            });
            options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
            {
                {
                    new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                    {
                        Reference = new Microsoft.OpenApi.Models.OpenApiReference
                        {
                            Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                            Id   = "Bearer",
                        },
                    },
                    Array.Empty<string>()
                },
            });
        });

        return services;
    }
}
