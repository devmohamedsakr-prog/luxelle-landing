namespace Luxelle.Application.Payments.DTOs;

public class CreatePaymentIntentDto
{
    public int BookingId { get; set; }
    public int ServiceId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "usd";
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
}
