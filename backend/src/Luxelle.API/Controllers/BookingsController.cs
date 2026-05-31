using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Luxelle.API.Controllers;

/// <summary>
/// Manages service bookings and reservations
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _svc;
    public BookingsController(IBookingService svc) => _svc = svc;

    /// <summary>Get all bookings (paginated)</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        CancellationToken ct,
        [FromQuery] int page     = 1,
        [FromQuery] int pageSize = 20)
    {
        var all    = await _svc.GetAllAsync(ct);
        var paged  = all.Skip((page - 1) * pageSize).Take(pageSize);
        return Ok(new { data = paged, page, pageSize, total = all.Count() });
    }

    /// <summary>Get a specific booking by ID</summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var booking = await _svc.GetByIdAsync(id, ct);
        return booking is null ? NotFound() : Ok(booking);
    }

    /// <summary>Get all bookings for a specific user</summary>
    [HttpGet("user/{userId:int}")]
    public async Task<IActionResult> GetByUser(int userId, CancellationToken ct) =>
        Ok(await _svc.GetByUserIdAsync(userId, ct));

    /// <summary>Get bookings within a date range</summary>
    [HttpGet("range")]
    public async Task<IActionResult> GetByDateRange(
        [FromQuery] DateTime from,
        [FromQuery] DateTime to,
        CancellationToken ct) =>
        Ok(await _svc.GetByDateRangeAsync(from, to, ct));

    /// <summary>Create a new booking</summary>
    [HttpPost]
    public async Task<IActionResult> Create(CreateBookingDto dto, CancellationToken ct)
    {
        var created = await _svc.CreateAsync(dto, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>Create a booking for a guest customer</summary>
    [HttpPost("guest")]
    public async Task<IActionResult> CreateGuest([FromBody] GuestBookingDto dto, CancellationToken ct)
    {
        var created = await _svc.CreateGuestAsync(dto, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>Update an existing booking</summary>
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateBookingDto dto, CancellationToken ct)
    {
        var updated = await _svc.UpdateAsync(id, dto, ct);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>Delete a booking</summary>
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var deleted = await _svc.DeleteAsync(id, ct);
        return deleted ? NoContent() : NotFound();
    }
}
