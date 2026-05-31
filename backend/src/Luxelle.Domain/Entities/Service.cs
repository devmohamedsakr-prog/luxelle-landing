namespace Luxelle.Domain.Entities;

public class Service
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
    public bool IsAvailable { get; set; } = true;
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
