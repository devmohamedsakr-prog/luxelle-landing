using Luxelle.Application.Payments.DTOs;

namespace Luxelle.Application.Payments.Interfaces;

public interface IStripeService
{
    Task<PaymentResponseDto> CreatePaymentIntentAsync(CreatePaymentIntentDto dto);
    Task<bool> ConfirmPaymentAsync(string paymentIntentId);
    Task<string> GetPublishableKeyAsync();
}
