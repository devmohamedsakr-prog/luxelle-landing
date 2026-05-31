using Luxelle.Domain.Entities;
using Luxelle.Infrastructure.Data.Configuration;
using Luxelle.Infrastructure.Data.Seeds;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<PricingTier> PricingTiers => Set<PricingTier>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new ServiceConfiguration());
        modelBuilder.ApplyConfiguration(new BookingConfiguration());
        modelBuilder.ApplyConfiguration(new PricingTierConfiguration());

        // Static seed — only runs on fresh DB creation
        modelBuilder.SeedServices();
    }
}
