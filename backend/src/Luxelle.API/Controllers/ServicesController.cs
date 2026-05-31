using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace Luxelle.API.Controllers;

/// <summary>
/// Manages beauty and wellness services
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IServiceService _svc;
    public ServicesController(IServiceService svc) => _svc = svc;

    /// <summary>Get all services (cached 10 min)</summary>
    [HttpGet]
    [OutputCache(PolicyName = "services")]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await _svc.GetAllAsync(ct));

    /// <summary>Get only available services (cached 10 min)</summary>
    [HttpGet("available")]
    [OutputCache(PolicyName = "services")]
    public async Task<IActionResult> GetAvailable(CancellationToken ct) =>
        Ok(await _svc.GetAvailableAsync(ct));

    /// <summary>Get services by category</summary>
    [HttpGet("category/{category}")]
    [OutputCache(PolicyName = "services")]
    public async Task<IActionResult> GetByCategory(string category, CancellationToken ct) =>
        Ok(await _svc.GetByCategoryAsync(category, ct));

    /// <summary>Get a specific service by ID</summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var service = await _svc.GetByIdAsync(id, ct);
        return service is null ? NotFound() : Ok(service);
    }

    /// <summary>Create a new service</summary>
    [HttpPost]
    public async Task<IActionResult> Create(CreateServiceDto dto, CancellationToken ct)
    {
        var created = await _svc.CreateAsync(dto, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>Update an existing service</summary>
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateServiceDto dto, CancellationToken ct)
    {
        var updated = await _svc.UpdateAsync(id, dto, ct);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>Delete a service</summary>
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var deleted = await _svc.DeleteAsync(id, ct);
        return deleted ? NoContent() : NotFound();
    }
}
