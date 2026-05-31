using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _ctx;

    public UserRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<User>> GetAllAsync(CancellationToken ct = default) =>
        await _ctx.Users.AsNoTracking().OrderBy(u => u.FullName).ToListAsync(ct);

    public async Task<User?> GetByIdAsync(int id, CancellationToken ct = default) =>
        await _ctx.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id, ct);

    public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default) =>
        await _ctx.Users.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email, ct);

    public async Task<User> AddAsync(User entity, CancellationToken ct = default)
    {
        _ctx.Users.Add(entity);
        await _ctx.SaveChangesAsync(ct);
        return entity;
    }

    public async Task<User> UpdateAsync(User entity, CancellationToken ct = default)
    {
        _ctx.Users.Update(entity);
        await _ctx.SaveChangesAsync(ct);
        return entity;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        await _ctx.Users.Where(u => u.Id == id).ExecuteDeleteAsync(ct);
    }
}
