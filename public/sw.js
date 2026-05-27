// ─── Scooped admin service worker ─────────────────────────────────────────
// Minimal SW: bumps the cache version on each deploy, falls back to network
// for everything except the admin shell (cached on install for offline).
const VERSION = 'scooped-v1';
const SHELL   = ['/', '/admin'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Don't intercept Supabase / n8n / cross-origin — let them go straight to network.
  if (url.origin !== self.location.origin) return;
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request).then((r) => r || caches.match('/admin'))
    ),
  );
});

// Push notification handler (optional — used if/when n8n posts push via VAPID).
self.addEventListener('push', (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch {}
  const title = data.title || '🛎 New Scooped order';
  const opts = {
    body: data.body || 'Tap to open the order',
    icon: '/apple-touch-icon.svg',
    badge: '/favicon.svg',
    data: { url: data.url || '/admin' },
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = e.notification.data?.url || '/admin';
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((list) => {
      for (const c of list) {
        if (c.url.includes(target) && 'focus' in c) return c.focus();
      }
      return self.clients.openWindow(target);
    }),
  );
});
