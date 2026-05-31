using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Repositories;

public class ServiceRepository : IServiceRepository
{
    private readonly AppDbContext _ctx;

    public ServiceRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<Service>> GetAllAsync(CancellationToken ct = default) =>
        await _ctx.Services.AsNoTracking().OrderBy(s => s.Name).ToListAsync(ct);

    public async Task<Service?> GetByIdAsync(int id, CancellationToken ct = default) =>
        await _ctx.Services.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id, ct);

    public async Task<IEnumerable<Service>> GetByCategoryAsync(string category, CancellationToken ct = default) =>
        await _ctx.Services.AsNoTracking()
            .Where(s => s.Category == category)
            .ToListAsync(ct);

    public async Task<IEnumerable<Service>> GetAvailableAsync(CancellationToken ct = default) =>
        await _ctx.Services.AsNoTracking()
            .Where(s => s.IsAvailable)
            .OrderBy(s => s.Name)
            .ToListAsync(ct);

    public async Task<Service> AddAsync(Service entity, CancellationToken ct = default)
    {
        _ctx.Services.Add(entity);
        await _ctx.SaveChangesAsync(ct);
        return entity;
    }

    public async Task<Service> UpdateAsync(Service entity, CancellationToken ct = default)
    {
        _ctx.Services.Update(entity);
        await _ctx.SaveChangesAsync(ct);
        return entity;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        await _ctx.Services.Where(s => s.Id == id).ExecuteDeleteAsync(ct);
    }
}
