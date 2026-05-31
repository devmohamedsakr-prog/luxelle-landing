using Luxelle.Domain.Entities;

namespace Luxelle.Domain.Interfaces;

public interface IBookingRepository : IRepository<Booking>
{
    Task<IEnumerable<Booking>> GetByUserIdAsync(int userId, CancellationToken ct = default);
    Task<IEnumerable<Booking>> GetByServiceIdAsync(int serviceId, CancellationToken ct = default);
    Task<IEnumerable<Booking>> GetByDateRangeAsync(DateTime from, DateTime to, CancellationToken ct = default);
}
