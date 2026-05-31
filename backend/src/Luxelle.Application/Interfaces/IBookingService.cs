using Luxelle.Application.DTOs;

namespace Luxelle.Application.Interfaces;

public interface IBookingService
{
    Task<IEnumerable<BookingDto>> GetAllAsync(CancellationToken ct = default);
    Task<BookingDto?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<IEnumerable<BookingDto>> GetByUserIdAsync(int userId, CancellationToken ct = default);
    Task<IEnumerable<BookingDto>> GetByDateRangeAsync(DateTime from, DateTime to, CancellationToken ct = default);
    Task<BookingDto> CreateAsync(CreateBookingDto dto, CancellationToken ct = default);
    Task<BookingDto> CreateGuestAsync(GuestBookingDto dto, CancellationToken ct = default);
    Task<BookingDto?> UpdateAsync(int id, UpdateBookingDto dto, CancellationToken ct = default);
    Task<bool> DeleteAsync(int id, CancellationToken ct = default);
}
