namespace Luxelle.Application.DTOs;

public class PricingTierDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Icon { get; set; } = string.Empty;
    public bool IsPopular { get; set; }
    public List<string> Features { get; set; } = new();
    public int DisplayOrder { get; set; }
}
