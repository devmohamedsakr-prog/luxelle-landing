using Luxelle.Application.DTOs;

namespace Luxelle.Application.Interfaces;

public interface IServiceService
{
    Task<IEnumerable<ServiceDto>> GetAllAsync(CancellationToken ct = default);
    Task<IEnumerable<ServiceDto>> GetAvailableAsync(CancellationToken ct = default);
    Task<IEnumerable<ServiceDto>> GetByCategoryAsync(string category, CancellationToken ct = default);
    Task<ServiceDto?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<ServiceDto> CreateAsync(CreateServiceDto dto, CancellationToken ct = default);
    Task<ServiceDto?> UpdateAsync(int id, UpdateServiceDto dto, CancellationToken ct = default);
    Task<bool> DeleteAsync(int id, CancellationToken ct = default);
}
