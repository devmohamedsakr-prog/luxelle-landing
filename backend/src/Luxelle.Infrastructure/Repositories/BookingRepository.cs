using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly AppDbContext _ctx;

    public BookingRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<Booking>> GetAllAsync(CancellationToken ct = default) =>
        await _ctx.Bookings
            .AsNoTracking()
            .Include(b => b.User)
            .Include(b => b.Service)
            .OrderByDescending(b => b.AppointmentDate)
            .ToListAsync(ct);

    public async Task<Booking?> GetByIdAsync(int id, CancellationToken ct = default) =>
        await _ctx.Bookings
            .AsNoTracking()
            .Include(b => b.User)
            .Include(b => b.Service)
            .FirstOrDefaultAsync(b => b.Id == id, ct);

    public async Task<IEnumerable<Booking>> GetByUserIdAsync(int userId, CancellationToken ct = default) =>
        await _ctx.Bookings
            .AsNoTracking()
            .Include(b => b.User)
            .Include(b => b.Service)
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.AppointmentDate)
            .ToListAsync(ct);

    public async Task<IEnumerable<Booking>> GetByServiceIdAsync(int serviceId, CancellationToken ct = default) =>
        await _ctx.Bookings
            .AsNoTracking()
            .Include(b => b.User)
            .Include(b => b.Service)
            .Where(b => b.ServiceId == serviceId)
            .ToListAsync(ct);

    public async Task<IEnumerable<Booking>> GetByDateRangeAsync(DateTime from, DateTime to, CancellationToken ct = default) =>
        await _ctx.Bookings
            .AsNoTracking()
            .Include(b => b.User)
            .Include(b => b.Service)
            .Where(b => b.AppointmentDate >= from && b.AppointmentDate <= to)
            .OrderBy(b => b.AppointmentDate)
            .ToListAsync(ct);

    public async Task<Booking> AddAsync(Booking entity, CancellationToken ct = default)
    {
        _ctx.Bookings.Add(entity);
        await _ctx.SaveChangesAsync(ct);
        return entity;
    }

    public async Task<Booking> UpdateAsync(Booking entity, CancellationToken ct = default)
    {
        _ctx.Bookings.Update(entity);
        await _ctx.SaveChangesAsync(ct);
        return entity;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        var rows = await _ctx.Bookings
            .Where(b => b.Id == id)
            .ExecuteDeleteAsync(ct);
        _ = rows;
    }
}
