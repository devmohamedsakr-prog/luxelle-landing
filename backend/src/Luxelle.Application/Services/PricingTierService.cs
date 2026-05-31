using System.Text.Json;
using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;

namespace Luxelle.Application.Services;

public class PricingTierService : IPricingTierService
{
    private readonly IPricingTierRepository _repo;

    public PricingTierService(IPricingTierRepository repo) => _repo = repo;

    public async Task<IEnumerable<PricingTierDto>> GetAllAsync(CancellationToken ct = default) =>
        (await _repo.GetAllAsync(ct)).Select(MapToDto);

    private static PricingTierDto MapToDto(PricingTier p) => new()
    {
        Id           = p.Id,
        Name         = p.Name,
        Description  = p.Description,
        Price        = p.Price,
        Icon         = p.Icon,
        IsPopular    = p.IsPopular,
        DisplayOrder = p.DisplayOrder,
        Features     = JsonSerializer.Deserialize<List<string>>(p.FeaturesJson) ?? new List<string>(),
    };
}
