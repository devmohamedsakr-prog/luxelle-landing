using System.Security.Cryptography;
using System.Text;
using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;

namespace Luxelle.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repo;

    private const int Iterations = 100_000;
    private const int SaltBytes  = 16;
    private const int HashBytes  = 32;

    public UserService(IUserRepository repo) => _repo = repo;

    public async Task<IEnumerable<UserDto>> GetAllAsync() =>
        (await _repo.GetAllAsync()).Select(MapToDto);

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        return user is null ? null : MapToDto(user);
    }

    public async Task<UserDto?> GetByEmailAsync(string email)
    {
        var user = await _repo.GetByEmailAsync(email);
        return user is null ? null : MapToDto(user);
    }

    public async Task<UserDto> CreateAsync(CreateUserDto dto)
    {
        var user = new User
        {
            FullName     = dto.FullName,
            Email        = dto.Email,
            Phone        = dto.Phone,
            PasswordHash = HashPassword(dto.Password),
        };
        var created = await _repo.AddAsync(user);
        return MapToDto(created);
    }

    public async Task<UserDto?> UpdateAsync(int id, UpdateUserDto dto)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user is null) return null;
        user.FullName = dto.FullName;
        user.Phone    = dto.Phone;
        var updated = await _repo.UpdateAsync(user);
        return MapToDto(updated);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user is null) return false;
        await _repo.DeleteAsync(id);
        return true;
    }

    internal static string HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(SaltBytes);
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(password),
            salt,
            Iterations,
            HashAlgorithmName.SHA256,
            HashBytes);
        return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
    }

    private static UserDto MapToDto(User u) => new()
    {
        Id        = u.Id,
        FullName  = u.FullName,
        Email     = u.Email,
        Phone     = u.Phone,
        CreatedAt = u.CreatedAt,
    };
}
