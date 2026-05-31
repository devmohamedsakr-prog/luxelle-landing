using Luxelle.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Data.Seeds;

public static class ServiceSeeder
{
    public static void SeedServices(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Service>().HasData(
            new Service
            {
                Id = 1,
                Name = "Luxury Facial",
                Description = "Deep cleansing facial with premium serums",
                Category = "Skincare",
                Price = 120,
                DurationMinutes = 60,
                IsAvailable = true
            },
            new Service
            {
                Id = 2,
                Name = "Swedish Massage",
                Description = "Full body relaxation massage",
                Category = "Massage",
                Price = 90,
                DurationMinutes = 60,
                IsAvailable = true
            },
            new Service
            {
                Id = 3,
                Name = "Manicure & Pedicure",
                Description = "Complete nail care with gel polish",
                Category = "Nails",
                Price = 75,
                DurationMinutes = 90,
                IsAvailable = true
            },
            new Service
            {
                Id = 4,
                Name = "Hair Treatment",
                Description = "Deep conditioning and styling",
                Category = "Hair",
                Price = 85,
                DurationMinutes = 75,
                IsAvailable = true
            }
        );
    }
}
