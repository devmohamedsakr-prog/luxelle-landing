using Luxelle.Application.Common.Models;
using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;

namespace Luxelle.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WebhookController : ControllerBase
{
    private readonly StripeOptions _stripeOptions;
    private readonly IBookingService _bookingService;
    private readonly ILogger<WebhookController> _logger;

    public WebhookController(IOptions<StripeOptions> stripeOptions, IBookingService bookingService, ILogger<WebhookController> logger)
    {
        _stripeOptions = stripeOptions.Value;
        _bookingService = bookingService;
        _logger = logger;
    }

    [HttpPost("stripe")]
    public async Task<IActionResult> HandleStripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                _stripeOptions.WebhookSecret
            );

            _logger.LogInformation("Webhook received: {EventType}", stripeEvent.Type);

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    await HandlePaymentIntentSucceeded(stripeEvent.Data.Object as PaymentIntent);
                    break;

                case "payment_intent.payment_failed":
                    await HandlePaymentIntentFailed(stripeEvent.Data.Object as PaymentIntent);
                    break;

                case "charge.refunded":
                    await HandleChargeRefunded(stripeEvent.Data.Object as Charge);
                    break;

                default:
                    _logger.LogWarning("Unhandled event type: {EventType}", stripeEvent.Type);
                    break;
            }

            return Ok();
        }
        catch (StripeException ex)
        {
            _logger.LogError(ex, "Stripe webhook error: {Message}", ex.Message);
            return BadRequest();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Webhook processing error: {Message}", ex.Message);
            return StatusCode(500);
        }
    }

    private async Task HandlePaymentIntentSucceeded(PaymentIntent? paymentIntent)
    {
        if (paymentIntent?.Metadata == null || !paymentIntent.Metadata.TryGetValue("BookingId", out var bookingIdStr))
        {
            _logger.LogWarning("Payment intent succeeded but no BookingId in metadata");
            return;
        }

        if (int.TryParse(bookingIdStr, out var bookingId))
        {
            _logger.LogInformation("Payment succeeded for booking: {BookingId}", bookingId);
            // Update booking status to confirmed
            // This would typically update the booking status in the database
        }
    }

    private async Task HandlePaymentIntentFailed(PaymentIntent? paymentIntent)
    {
        if (paymentIntent?.Metadata == null || !paymentIntent.Metadata.TryGetValue("BookingId", out var bookingIdStr))
        {
            _logger.LogWarning("Payment intent failed but no BookingId in metadata");
            return;
        }

        if (int.TryParse(bookingIdStr, out var bookingId))
        {
            _logger.LogInformation("Payment failed for booking: {BookingId}", bookingId);
            // Update booking status to failed
        }
    }

    private async Task HandleChargeRefunded(Charge? charge)
    {
        if (charge?.Metadata == null || !charge.Metadata.TryGetValue("BookingId", out var bookingIdStr))
        {
            _logger.LogWarning("Charge refunded but no BookingId in metadata");
            return;
        }

        if (int.TryParse(bookingIdStr, out var bookingId))
        {
            _logger.LogInformation("Charge refunded for booking: {BookingId}", bookingId);
            // Update booking status to refunded
        }
    }
}
