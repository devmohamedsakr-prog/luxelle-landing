using Luxelle.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Luxelle.Infrastructure.Data.Configuration;

public class ServiceConfiguration : IEntityTypeConfiguration<Service>
{
    public void Configure(EntityTypeBuilder<Service> builder)
    {
        builder.HasKey(s => s.Id);
        
        builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(s => s.Description)
            .HasMaxLength(500);
        
        builder.Property(s => s.Category)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(s => s.Price)
            .HasColumnType("decimal(10,2)");
        
        builder.Property(s => s.DurationMinutes)
            .IsRequired();
        
        builder.Property(s => s.IsAvailable)
            .HasDefaultValue(true);
    }
}
