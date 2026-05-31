const CACHE_NAME = 'luxelle-v2';
const STATIC_ASSETS = [
  '/assets/images/hero/hero-bg.png',
  '/assets/images/about/about-main.png',
  '/assets/images/gallery/gallery-skincare.png',
  '/assets/images/gallery/gallery-hair.png',
  '/assets/images/gallery/gallery-makeup.png',
  '/assets/images/gallery/gallery-spa.png',
  '/assets/images/gallery/gallery-lashes.png',
  '/assets/images/gallery/gallery-nails.png',
  '/assets/images/gallery/gallery-facial.png',
  '/assets/images/gallery/gallery-wellness.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  // Always network-first for HTML, scripts, and styles so the latest
  // compiled Angular bundle is always served — never a stale cached copy
  if (
    request.mode === 'navigate' ||
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style'
  ) {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(request).then(c => c || caches.match('/index.html'))
      )
    );
    return;
  }

  // Cache-first only for images and fonts (safe to cache long-term)
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Default: network-first for everything else
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
