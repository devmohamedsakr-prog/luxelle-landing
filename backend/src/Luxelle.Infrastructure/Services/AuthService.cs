using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Luxelle.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _users;
    private readonly IConfiguration  _config;

    private const int Iterations  = 100_000;
    private const int SaltBytes   = 16;
    private const int HashBytes    = 32;

    public AuthService(IUserRepository users, IConfiguration config)
    {
        _users  = users;
        _config = config;
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
    {
        var user = await _users.GetByEmailAsync(dto.Email);
        if (user is null) return null;

        if (!VerifyPassword(dto.Password, user.PasswordHash)) return null;

        return BuildResponse(user);
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        var existing = await _users.GetByEmailAsync(dto.Email);
        if (existing is not null)
            throw new InvalidOperationException("An account with this email already exists.");

        var user = new User
        {
            FullName     = dto.FullName,
            Email        = dto.Email,
            Phone        = dto.Phone,
            PasswordHash = HashPassword(dto.Password),
            CreatedAt    = DateTime.UtcNow,
        };

        await _users.AddAsync(user);
        return BuildResponse(user);
    }

    // ── Password helpers (PBKDF2-SHA256 with salt) ────────────────────────────

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

    public static bool VerifyPassword(string password, string stored)
    {
        if (string.IsNullOrEmpty(stored)) return false;

        var parts = stored.Split(':');
        if (parts.Length != 2) return LegacyVerify(password, stored);

        try
        {
            var salt        = Convert.FromBase64String(parts[0]);
            var storedHash  = Convert.FromBase64String(parts[1]);
            var inputHash   = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                Iterations,
                HashAlgorithmName.SHA256,
                HashBytes);

            return CryptographicOperations.FixedTimeEquals(storedHash, inputHash);
        }
        catch
        {
            return LegacyVerify(password, stored);
        }
    }

    private static bool LegacyVerify(string password, string stored) =>
        Convert.ToBase64String(Encoding.UTF8.GetBytes(password)) == stored;

    // ── JWT builder ───────────────────────────────────────────────────────────

    private AuthResponseDto BuildResponse(User user)
    {
        var jwtKey   = _config["Jwt:Key"]      ?? "LuxelleSuperSecretKeyThatIsAtLeast32Chars!!";
        var issuer   = _config["Jwt:Issuer"]   ?? "LuxelleAPI";
        var audience = _config["Jwt:Audience"] ?? "LuxelleApp";
        var expires  = DateTime.UtcNow.AddDays(7);

        var key    = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds  = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub,   user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name,  user.FullName),
            new Claim(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString()),
        };

        var token = new JwtSecurityToken(
            issuer:             issuer,
            audience:           audience,
            claims:             claims,
            expires:            expires,
            signingCredentials: creds);

        return new AuthResponseDto
        {
            Token     = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expires,
            User      = new UserDto
            {
                Id        = user.Id,
                FullName  = user.FullName,
                Email     = user.Email,
                Phone     = user.Phone,
                CreatedAt = user.CreatedAt,
            },
        };
    }
}
