using Luxelle.Domain.Entities;

namespace Luxelle.Domain.Interfaces;

public interface IServiceRepository : IRepository<Service>
{
    Task<IEnumerable<Service>> GetByCategoryAsync(string category, CancellationToken ct = default);
    Task<IEnumerable<Service>> GetAvailableAsync(CancellationToken ct = default);
}
