using Luxelle.Application.Common.Models;
using Luxelle.Application.Payments.DTOs;
using Luxelle.Application.Payments.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Stripe;

namespace Luxelle.Infrastructure.Services;

public class StripeService : IStripeService
{
    private readonly StripeOptions _stripeOptions;
    private readonly ILogger<StripeService> _logger;

    public StripeService(IOptions<StripeOptions> stripeOptions, ILogger<StripeService> logger)
    {
        _stripeOptions = stripeOptions.Value;
        _logger = logger;
        StripeConfiguration.ApiKey = _stripeOptions.SecretKey;
    }

    public async Task<PaymentResponseDto> CreatePaymentIntentAsync(CreatePaymentIntentDto dto)
    {
        try
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(dto.Amount * 100), // Convert to cents
                Currency = dto.Currency.ToLower(),
                PaymentMethodTypes = new List<string> { "card" },
                Metadata = new Dictionary<string, string>
                {
                    { "BookingId", dto.BookingId.ToString() },
                    { "ServiceId", dto.ServiceId.ToString() }
                },
                ReceiptEmail = string.IsNullOrWhiteSpace(dto.CustomerEmail) ? null : dto.CustomerEmail,
                Description = $"Luxelle booking #{dto.BookingId}"
            };

            var service = new PaymentIntentService();
            var paymentIntent = await service.CreateAsync(options);

            _logger.LogInformation("Payment intent created: {PaymentIntentId}", paymentIntent.Id);

            return new PaymentResponseDto
            {
                ClientSecret = paymentIntent.ClientSecret,
                PaymentIntentId = paymentIntent.Id,
                Amount = dto.Amount,
                Currency = dto.Currency,
                Status = paymentIntent.Status
            };
        }
        catch (StripeException ex)
        {
            _logger.LogError(ex, "Stripe error creating payment intent: {Message}", ex.Message);
            throw;
        }
    }

    public async Task<bool> ConfirmPaymentAsync(string paymentIntentId)
    {
        try
        {
            var service = new PaymentIntentService();
            var paymentIntent = await service.GetAsync(paymentIntentId);

            _logger.LogInformation("Payment intent status: {PaymentIntentId} - {Status}", paymentIntentId, paymentIntent.Status);

            return paymentIntent.Status == "succeeded";
        }
        catch (StripeException ex)
        {
            _logger.LogError(ex, "Stripe error confirming payment: {Message}", ex.Message);
            throw;
        }
    }

    public Task<string> GetPublishableKeyAsync()
    {
        return Task.FromResult(_stripeOptions.PublishableKey);
    }
}
