using Luxelle.Application.DTOs;

namespace Luxelle.Application.Interfaces;

public interface IPricingTierService
{
    Task<IEnumerable<PricingTierDto>> GetAllAsync(CancellationToken ct = default);
}
