using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Luxelle.Domain.Entities;
using Luxelle.Domain.Enums;
using Luxelle.Domain.Interfaces;

namespace Luxelle.Application.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _repo;
    private readonly IUserRepository    _userRepo;
    private readonly IServiceRepository _serviceRepo;

    public BookingService(IBookingRepository repo, IUserRepository userRepo, IServiceRepository serviceRepo)
    {
        _repo        = repo;
        _userRepo    = userRepo;
        _serviceRepo = serviceRepo;
    }

    public async Task<IEnumerable<BookingDto>> GetAllAsync(CancellationToken ct = default) =>
        (await _repo.GetAllAsync(ct)).Select(MapToDto);

    public async Task<BookingDto?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var booking = await _repo.GetByIdAsync(id, ct);
        return booking is null ? null : MapToDto(booking);
    }

    public async Task<IEnumerable<BookingDto>> GetByUserIdAsync(int userId, CancellationToken ct = default) =>
        (await _repo.GetByUserIdAsync(userId, ct)).Select(MapToDto);

    public async Task<IEnumerable<BookingDto>> GetByDateRangeAsync(DateTime from, DateTime to, CancellationToken ct = default) =>
        (await _repo.GetByDateRangeAsync(from, to, ct)).Select(MapToDto);

    public async Task<BookingDto> CreateAsync(CreateBookingDto dto, CancellationToken ct = default)
    {
        var user    = await _userRepo.GetByIdAsync(dto.UserId, ct);
        var service = await _serviceRepo.GetByIdAsync(dto.ServiceId, ct);

        var booking = new Booking
        {
            UserId          = dto.UserId,
            ServiceId       = dto.ServiceId,
            AppointmentDate = dto.AppointmentDate,
            Notes           = dto.Notes,
            Status          = BookingStatus.Pending,
            User            = user,
            Service         = service,
        };
        var created = await _repo.AddAsync(booking, ct);
        return MapToDto(created);
    }

    public async Task<BookingDto> CreateGuestAsync(GuestBookingDto dto, CancellationToken ct = default)
    {
        var user = await _userRepo.GetByEmailAsync(dto.Email, ct);
        if (user is null)
        {
            user = await _userRepo.AddAsync(new User
            {
                FullName     = dto.FullName,
                Email        = dto.Email,
                Phone        = dto.Phone,
                PasswordHash = string.Empty,
            }, ct);
        }

        var service = await _serviceRepo.GetByIdAsync(dto.ServiceId, ct);

        var booking = new Booking
        {
            UserId          = user.Id,
            ServiceId       = dto.ServiceId,
            AppointmentDate = dto.AppointmentDate,
            Notes           = dto.Notes,
            Status          = BookingStatus.Pending,
            User            = user,
            Service         = service,
        };
        var created = await _repo.AddAsync(booking, ct);
        return MapToDto(created);
    }

    public async Task<BookingDto?> UpdateAsync(int id, UpdateBookingDto dto, CancellationToken ct = default)
    {
        var booking = await _repo.GetByIdAsync(id, ct);
        if (booking is null) return null;

        booking.AppointmentDate = dto.AppointmentDate;
        booking.Status          = dto.Status;
        booking.Notes           = dto.Notes;

        await _repo.UpdateAsync(booking, ct);
        return MapToDto(booking);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken ct = default)
    {
        var exists = await _repo.GetByIdAsync(id, ct);
        if (exists is null) return false;
        await _repo.DeleteAsync(id, ct);
        return true;
    }

    private static BookingDto MapToDto(Booking b) => new()
    {
        Id              = b.Id,
        UserId          = b.UserId,
        UserName        = b.User?.FullName    ?? string.Empty,
        ServiceId       = b.ServiceId,
        ServiceName     = b.Service?.Name     ?? string.Empty,
        AppointmentDate = b.AppointmentDate,
        Status          = b.Status,
        Notes           = b.Notes,
        CreatedAt       = b.CreatedAt,
    };
}
