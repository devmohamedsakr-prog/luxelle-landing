---
name: Luxelle performance & security audit
description: Key decisions made during the deep query audit and performance review of the Luxelle Angular/.NET app.
---

## Password hashing
PBKDF2-SHA256 (Rfc2898DeriveBytes) is used in both AuthService and UserService. Each stores as `base64(salt):base64(hash)`. A legacy-verify fallback handles old Base64-only passwords.
**Why:** Original code used Base64 encoding — not a hash at all.
**How to apply:** Always use `AuthService.HashPassword` / `UserService.HashPassword` (internal static). Never use Base64 for credentials.

## CancellationToken convention
All repository interfaces (IRepository<T>, IBookingRepository, IServiceRepository, IUserRepository, IPricingTierRepository) and all service interfaces have `CancellationToken ct = default` on every async method.
**Why:** Allows ASP.NET to cancel DB queries when the client disconnects, preventing wasted DB load.
**How to apply:** When adding new repo/service methods, always include `CancellationToken ct = default`.

## EF Core AsNoTracking
All read-only repository queries use `.AsNoTracking()`. Only `AddAsync`, `UpdateAsync`, `DeleteAsync` use tracked entities.
**Why:** Removes EF change-tracker overhead on reads — meaningful at scale.

## Eliminate duplicate DB roundtrips
BookingService.CreateAsync / CreateGuestAsync pre-load User and Service entities, attach them to the Booking before AddAsync, then map from in-memory entity — no second GetByIdAsync.
BookingService.UpdateAsync reuses the first GetByIdAsync result for mapping — no second fetch.
**Why:** Each saved roundtrip to an external SQL Server is 10–50ms.

## Output caching
ServicesController GET endpoints use `[OutputCache(PolicyName = "services")]` (10-min TTL). PricingController uses "pricing" policy (30-min TTL). Registered in ServiceConfiguration via `services.AddOutputCache(...)` and `app.UseOutputCache()`.
**Why:** Services and pricing are nearly static — caching eliminates repeated DB queries on every page load.

## Response compression
Brotli + Gzip compression enabled via `services.AddResponseCompression(...)` and `app.UseResponseCompression()` in Program.cs.
**Why:** JSON API responses compress 60–80%, reducing bandwidth and latency.

## Frontend — OnPush everywhere
All feature and layout components have `changeDetection: ChangeDetectionStrategy.OnPush`. Components use Angular signals (signal/computed) so they work correctly with OnPush.
**Why:** Default change detection runs on every browser event; OnPush only on input/signal changes.

## Frontend — trackBy on all *ngFor
All *ngFor loops have trackBy functions: trackById (for API entities), trackByIndex (for static arrays), trackByFeature (for string arrays).
**Why:** Without trackBy, Angular destroys and recreates every DOM node when the array reference changes.

## Scroll listener cleanup
NavigationService stores the scroll handler as a class property and calls `window.removeEventListener` in `ngOnDestroy`. Listener uses `{ passive: true }` option.
**Why:** Anonymous arrow functions can't be removed; named references can.

## Application layer dependency rule
UserService and BookingService live in Luxelle.Application. They must NOT import from Luxelle.Infrastructure. Password hashing logic (PBKDF2) is duplicated in UserService (internal static method) to avoid a circular project reference.
**Why:** Application → Infrastructure is a layer violation.
