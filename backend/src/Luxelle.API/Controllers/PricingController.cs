using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace Luxelle.API.Controllers;

/// <summary>
/// Returns membership / subscription pricing tiers
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PricingController : ControllerBase
{
    private readonly IPricingTierService _svc;
    public PricingController(IPricingTierService svc) => _svc = svc;

    /// <summary>Get all pricing tiers ordered by display order (cached 30 min)</summary>
    [HttpGet]
    [OutputCache(PolicyName = "pricing")]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await _svc.GetAllAsync(ct));
}
