using Luxelle.Application.Payments.DTOs;
using Luxelle.Application.Payments.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Luxelle.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IStripeService _stripeService;
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(IStripeService stripeService, ILogger<PaymentsController> logger)
    {
        _stripeService = stripeService;
        _logger = logger;
    }

    [HttpPost("create-payment-intent")]
    public async Task<ActionResult<PaymentResponseDto>> CreatePaymentIntent([FromBody] CreatePaymentIntentDto dto)
    {
        try
        {
            if (dto.Amount <= 0)
                return BadRequest("Amount must be greater than 0");

            var response = await _stripeService.CreatePaymentIntentAsync(dto);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating payment intent");
            return StatusCode(500, new { error = "Failed to create payment intent" });
        }
    }

    [HttpGet("confirm-payment/{paymentIntentId}")]
    public async Task<ActionResult<object>> ConfirmPayment(string paymentIntentId)
    {
        try
        {
            var isSuccessful = await _stripeService.ConfirmPaymentAsync(paymentIntentId);
            return Ok(new { success = isSuccessful, paymentIntentId });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error confirming payment");
            return StatusCode(500, new { error = "Failed to confirm payment" });
        }
    }

    [HttpGet("publishable-key")]
    public async Task<ActionResult<object>> GetPublishableKey()
    {
        try
        {
            var key = await _stripeService.GetPublishableKeyAsync();
            return Ok(new { publishableKey = key });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting publishable key");
            return StatusCode(500, new { error = "Failed to get publishable key" });
        }
    }
}
