// Register the service worker + inject manifest link only on the admin routes.
// We don't want PWA install prompts on the storefront.

export function registerPwa() {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  // Inject manifest link if not present.
  if (!document.querySelector('link[rel="manifest"]')) {
    const l = document.createElement('link');
    l.rel  = 'manifest';
    l.href = '/manifest.webmanifest';
    document.head.appendChild(l);
  }

  // Register on next idle so we don't block initial paint.
  const reg = () => navigator.serviceWorker.register('/sw.js').catch((e) =>
    console.warn('[Scooped] SW registration failed:', e),
  );
  if ('requestIdleCallback' in window) requestIdleCallback(reg);
  else setTimeout(reg, 1500);
}
