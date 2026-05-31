using Luxelle.Application.Common.Models;
using Luxelle.Application.Payments.Interfaces;
using Luxelle.Infrastructure.Services;

namespace Luxelle.API.Configuration;

public static class StripeConfiguration
{
    public static IServiceCollection AddStripeServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<StripeOptions>(configuration.GetSection("Stripe"));
        services.AddScoped<IStripeService, StripeService>();

        return services;
    }
}
