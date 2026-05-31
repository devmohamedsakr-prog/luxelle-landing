namespace Luxelle.Domain.Entities;

public class PricingTier
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Icon { get; set; } = string.Empty;
    public bool IsPopular { get; set; }
    public string FeaturesJson { get; set; } = "[]";
    public int DisplayOrder { get; set; }
}
