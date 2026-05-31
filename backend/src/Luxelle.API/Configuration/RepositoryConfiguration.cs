using Luxelle.Application.Interfaces;
using Luxelle.Application.Services;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Repositories;
using Luxelle.Infrastructure.Services;

namespace Luxelle.API.Configuration;

public static class RepositoryConfiguration
{
    public static IServiceCollection AddRepositoriesAndServices(this IServiceCollection services)
    {
        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IServiceRepository, ServiceRepository>();
        services.AddScoped<IBookingRepository, BookingRepository>();
        services.AddScoped<IPricingTierRepository, PricingTierRepository>();

        // Application services
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IServiceService, ServiceService>();
        services.AddScoped<IBookingService, BookingService>();
        services.AddScoped<IPricingTierService, PricingTierService>();
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}
