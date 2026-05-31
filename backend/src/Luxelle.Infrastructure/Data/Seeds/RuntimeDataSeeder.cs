using System.Text.Json;
using Luxelle.Domain.Entities;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Data.Seeds;

/// <summary>
/// Runs at startup to ensure the DB has the full catalogue of services and pricing tiers.
/// Safe to run on an existing DB — only inserts missing records and updates existing ones.
/// Does NOT set explicit identity IDs — lets SQL Server auto-generate them.
/// </summary>
public static class RuntimeDataSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        await SeedServicesAsync(db);
        await SeedPricingTiersAsync(db);
    }

    // ── Services ──────────────────────────────────────────────────────────────

    private static async Task SeedServicesAsync(AppDbContext db)
    {
        var existingServices = await db.Services.ToListAsync();
        var existingNames    = existingServices.Select(s => s.Name).ToHashSet(StringComparer.OrdinalIgnoreCase);

        bool changed = false;

        // Update existing services to match catalogue values
        foreach (var target in GetServiceCatalogue())
        {
            var existing = existingServices.FirstOrDefault(s =>
                s.Name.Equals(target.Name, StringComparison.OrdinalIgnoreCase)
                || s.Category.Equals(target.Category, StringComparison.OrdinalIgnoreCase));

            if (existing is not null)
            {
                existing.Name            = target.Name;
                existing.Description     = target.Description;
                existing.Category        = target.Category;
                existing.Price           = target.Price;
                existing.DurationMinutes = target.DurationMinutes;
                existing.IsAvailable     = target.IsAvailable;
                db.Services.Update(existing);
                existingNames.Add(target.Name);
                changed = true;
            }
        }

        // Insert services that don't exist yet (by name) — no explicit Id
        var toInsert = GetServiceCatalogue()
            .Where(s => !existingNames.Contains(s.Name))
            .ToList();

        if (toInsert.Count > 0)
        {
            await db.Services.AddRangeAsync(toInsert);
            changed = true;
        }

        if (changed)
            await db.SaveChangesAsync();
    }

    /// <summary>
    /// Full service catalogue — no Id set, SQL Server identity auto-assigns.
    /// </summary>
    private static List<Service> GetServiceCatalogue() =>
    [
        new Service { Name = "Luxury Skincare",        Description = "Premium facial treatments with organic products and advanced techniques", Category = "Skincare",  Price = 150m, DurationMinutes = 60, IsAvailable = true },
        new Service { Name = "Hair Styling",           Description = "Expert hair cutting, coloring, and styling for all hair types",           Category = "Hair",      Price = 120m, DurationMinutes = 90, IsAvailable = true },
        new Service { Name = "Makeup Services",        Description = "Professional makeup application for events and everyday looks",            Category = "Makeup",    Price = 100m, DurationMinutes = 45, IsAvailable = true },
        new Service { Name = "Spa Experiences",        Description = "Relaxing spa treatments including massages and body treatments",            Category = "Spa",       Price = 180m, DurationMinutes = 90, IsAvailable = true },
        new Service { Name = "Lashes & Extensions",    Description = "Eyelash extensions, lifts, and tints for stunning eyes",                  Category = "Lashes",    Price = 80m,  DurationMinutes = 60, IsAvailable = true },
        new Service { Name = "Nails & Manicure",       Description = "Gel nails, manicures, pedicures with premium finishes",                   Category = "Nails",     Price = 70m,  DurationMinutes = 45, IsAvailable = true },
        new Service { Name = "Facial Treatments",      Description = "Specialized facials targeting specific skin concerns",                     Category = "Facial",    Price = 140m, DurationMinutes = 60, IsAvailable = true },
        new Service { Name = "Wellness Consultations", Description = "Personalized beauty and wellness consultations",                           Category = "Wellness",  Price = 60m,  DurationMinutes = 30, IsAvailable = true },
    ];

    // ── Pricing Tiers ─────────────────────────────────────────────────────────

    private static async Task SeedPricingTiersAsync(AppDbContext db)
    {
        // EnsureCreated only creates tables on the very first DB creation.
        // For an existing DB we must create the PricingTiers table manually if absent.
        await db.Database.ExecuteSqlRawAsync(@"
            IF NOT EXISTS (
                SELECT 1 FROM INFORMATION_SCHEMA.TABLES
                WHERE TABLE_NAME = 'PricingTiers'
            )
            BEGIN
                CREATE TABLE [PricingTiers] (
                    [Id]           INT            IDENTITY(1,1) NOT NULL PRIMARY KEY,
                    [Name]         NVARCHAR(100)  NOT NULL,
                    [Description]  NVARCHAR(500)  NULL,
                    [Price]        DECIMAL(10,2)  NOT NULL,
                    [Icon]         NVARCHAR(50)   NULL,
                    [IsPopular]    BIT            NOT NULL DEFAULT 0,
                    [FeaturesJson] NVARCHAR(MAX)  NOT NULL DEFAULT '[]',
                    [DisplayOrder] INT            NOT NULL DEFAULT 0
                )
            END
        ");

        if (await db.PricingTiers.AnyAsync()) return;

        // No explicit Id — let SQL Server auto-assign identity values
        await db.PricingTiers.AddRangeAsync(GetPricingTierCatalogue());
        await db.SaveChangesAsync();
    }

    private static List<PricingTier> GetPricingTierCatalogue() =>
    [
        new PricingTier
        {
            Name         = "Essential",
            Description  = "Perfect for getting started with our services",
            Price        = 99m,
            Icon         = "star",
            IsPopular    = false,
            DisplayOrder = 1,
            FeaturesJson = JsonSerializer.Serialize(new[]
            {
                "One service per month",
                "Basic skincare consultation",
                "Access to our facilities",
                "Email support",
            }),
        },
        new PricingTier
        {
            Name         = "Premium",
            Description  = "Our most popular choice for regular clients",
            Price        = 249m,
            Icon         = "crown",
            IsPopular    = true,
            DisplayOrder = 2,
            FeaturesJson = JsonSerializer.Serialize(new[]
            {
                "Four services per month",
                "Priority booking",
                "Personalized beauty plan",
                "Phone & email support",
                "10% discount on additional services",
            }),
        },
        new PricingTier
        {
            Name         = "Luxury",
            Description  = "Complete luxury experience",
            Price        = 499m,
            Icon         = "gem",
            IsPopular    = false,
            DisplayOrder = 3,
            FeaturesJson = JsonSerializer.Serialize(new[]
            {
                "Unlimited services",
                "VIP priority booking",
                "Dedicated beauty consultant",
                "24/7 concierge support",
                "Complimentary products",
                "Exclusive events access",
            }),
        },
        new PricingTier
        {
            Name         = "VIP",
            Description  = "Ultimate exclusive experience",
            Price        = 999m,
            Icon         = "sparkles",
            IsPopular    = false,
            DisplayOrder = 4,
            FeaturesJson = JsonSerializer.Serialize(new[]
            {
                "Everything in Luxury",
                "Private treatment rooms",
                "Personal stylist",
                "Customised wellness program",
                "Complimentary luxury products",
                "Priority access to new services",
                "Quarterly spa retreats",
            }),
        },
    ];
}
