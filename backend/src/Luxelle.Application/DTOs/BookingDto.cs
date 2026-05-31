using Luxelle.Domain.Entities;
using Luxelle.Domain.Enums;

namespace Luxelle.Application.DTOs;

public class BookingDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public int ServiceId { get; set; }
    public string ServiceName { get; set; } = string.Empty;
    public DateTime AppointmentDate { get; set; }
    public BookingStatus Status { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateBookingDto
{
    public int UserId { get; set; }
    public int ServiceId { get; set; }
    public DateTime AppointmentDate { get; set; }
    public string? Notes { get; set; }
}

public class UpdateBookingDto
{
    public DateTime AppointmentDate { get; set; }
    public BookingStatus Status { get; set; }
    public string? Notes { get; set; }
}

public class GuestBookingDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public int ServiceId { get; set; }
    public DateTime AppointmentDate { get; set; }
    public string? Notes { get; set; }
}
