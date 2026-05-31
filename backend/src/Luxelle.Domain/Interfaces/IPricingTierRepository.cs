using Luxelle.Domain.Entities;

namespace Luxelle.Domain.Interfaces;

public interface IPricingTierRepository
{
    Task<IEnumerable<PricingTier>> GetAllAsync(CancellationToken ct = default);
    Task<bool> AnyAsync(CancellationToken ct = default);
    Task AddRangeAsync(IEnumerable<PricingTier> tiers, CancellationToken ct = default);
}
