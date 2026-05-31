using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Repositories;

public class PricingTierRepository : IPricingTierRepository
{
    private readonly AppDbContext _ctx;

    public PricingTierRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<PricingTier>> GetAllAsync(CancellationToken ct = default) =>
        await _ctx.PricingTiers
            .AsNoTracking()
            .OrderBy(p => p.DisplayOrder)
            .ToListAsync(ct);

    public async Task<bool> AnyAsync(CancellationToken ct = default) =>
        await _ctx.PricingTiers.AnyAsync(ct);

    public async Task AddRangeAsync(IEnumerable<PricingTier> tiers, CancellationToken ct = default)
    {
        await _ctx.PricingTiers.AddRangeAsync(tiers, ct);
        await _ctx.SaveChangesAsync(ct);
    }
}
