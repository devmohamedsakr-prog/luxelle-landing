using Luxelle.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Luxelle.Infrastructure.Data.Configuration;

public class PricingTierConfiguration : IEntityTypeConfiguration<PricingTier>
{
    public void Configure(EntityTypeBuilder<PricingTier> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.Description)
            .HasMaxLength(500);

        builder.Property(p => p.Price)
            .HasColumnType("decimal(10,2)");

        builder.Property(p => p.Icon)
            .HasMaxLength(50);

        builder.Property(p => p.FeaturesJson)
            .HasColumnType("nvarchar(max)")
            .HasDefaultValue("[]");

        builder.Property(p => p.IsPopular)
            .HasDefaultValue(false);

        builder.Property(p => p.DisplayOrder)
            .HasDefaultValue(0);
    }
}
