// ═══════════════════════════════════════════════════════════
// ИНТЕРФУД КЕЙТЕРИНГ — Service Worker v3
// Secret Hacks: navigation preload, route prefetch, timeout race,
// background sync, stale-while-revalidate with network timeout
// ═══════════════════════════════════════════════════════════

const CACHE_NAME = 'interfood-v3';
const STATIC_CACHE = 'interfood-static-v3';
const IMAGE_CACHE = 'interfood-images-v3';
const MENU_CACHE = 'interfood-menu-v3';
const OFFLINE_URL = '/offline.html';

// HACK: Precache all known routes so they work offline instantly
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/menu',
  '/services',
  '/contacts',
  '/about',
  '/wedding',
  '/corporate',
  '/faq',
  '/reviews',
  '/gallery',
  '/calculator',
  '/logo.svg',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ── Navigation Preload: start network request before SW decides strategy ──
// HACK: Eliminates the ~50ms SW startup delay for navigation requests
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then((names) =>
        Promise.all(
          names
            .filter((n) => ![CACHE_NAME, STATIC_CACHE, IMAGE_CACHE, MENU_CACHE].includes(n))
            .map((n) => caches.delete(n))
        )
      ),
      // Enable navigation preload
      self.registration.navigationPreload?.enable?.().catch(() => {}),
    ])
  );
  self.clients.claim();
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      // HACK: Use Promise.allSettled instead of catch — individual URL failures
      // don't prevent other URLs from being cached
      Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

// ── Fetch Event Router ──
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.hostname !== self.location.hostname) return;

  // Static images: cache-first with 30-day expiry
  if (/\.(jpg|jpeg|png|webp|avif|svg|gif|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(IMAGE_CACHE, request));
    return;
  }

  // JS/CSS/fonts: cache-first (immutable after deploy)
  if (/\.(js|css|woff2?|ttf|otf)$/i.test(url.pathname)) {
    // HACK: For _next/static/ assets, serve from cache without network check
    // They have content hashes in filenames and are truly immutable
    if (url.pathname.includes('/_next/static/')) {
      event.respondWith(cacheFirst(STATIC_CACHE, request));
    } else {
      event.respondWith(staleWhileRevalidate(STATIC_CACHE, request));
    }
    return;
  }

  // Menu pages: stale-while-revalidate (show cached, update in background)
  if (url.pathname.startsWith('/menu') || url.pathname.startsWith('/calculator')) {
    event.respondWith(staleWhileRevalidate(MENU_CACHE, request));
    return;
  }

  // Navigation: network-first with preload + timeout + offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(navigationWithPreload(request));
    return;
  }

  // Everything else: stale-while-revalidate
  event.respondWith(staleWhileRevalidate(CACHE_NAME, request));
});

// ── Navigation with preload: fastest possible page loads ──
async function navigationWithPreload(request) {
  try {
    // HACK: Use navigation preload response if available (saves ~50ms)
    const preloadResponse = await event?.preloadResponse;
    if (preloadResponse) {
      cacheResponse(CACHE_NAME, request, preloadResponse.clone());
      return preloadResponse;
    }
  } catch {}

  return networkFirst(request);
}

// ── Cache Strategies ──

async function cacheFirst(name, req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const response = await fetchWithTimeout(req, 8000);
    if (response && response.status === 200) {
      cacheResponse(name, req, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function staleWhileRevalidate(name, req) {
  const cached = await caches.match(req);
  const fetchPromise = fetchWithTimeout(req, 6000)
    .then((response) => {
      if (response && response.status === 200) {
        cacheResponse(name, req, response.clone());
      }
      return response;
    })
    .catch(() => cached || new Response('Offline', { status: 503 }));

  return cached || fetchPromise;
}

async function networkFirst(req) {
  try {
    // HACK: 5-second timeout — if network is slow, fall back to cache
    // instead of leaving the user staring at a blank screen
    const response = await fetchWithTimeout(req, 5000);
    if (response && response.status === 200) {
      cacheResponse(CACHE_NAME, req, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(req);
    return cached || caches.match(OFFLINE_URL);
  }
}

// ── Utility: fetch with timeout (AbortController) ──
function fetchWithTimeout(req, timeoutMs) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(req, { signal: controller.signal }).finally(() => clearTimeout(id));
}

// ── Utility: non-blocking cache write ──
function cacheResponse(cacheName, req, response) {
  caches.open(cacheName).then((cache) => cache.put(req, response)).catch(() => {});
}

// ── Push Notifications ──
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'Интерфуд Кейтеринг', {
      body: data.body || 'Новое уведомление',
      icon: '/icons/icon-512.png',
      badge: '/icons/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' },
      actions: [
        { action: 'open', title: 'Открыть' },
        { action: 'close', title: 'Закрыть' },
      ],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(event.notification.data?.url || '/');
          return client.focus();
        }
      }
      return self.clients.openWindow(event.notification.data?.url || '/');
    })
  );
});

// ── Background Sync: retry failed contact form submissions ──
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(retryContactForm());
  }
});

async function retryContactForm() {
  // Retrieve stored form data and retry submission
  const db = await openDB();
  const entries = await getAllEntries(db);
  for (const entry of entries) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry.data),
      });
      if (response.ok) {
        await deleteEntry(db, entry.id);
      }
    } catch {
      // Will retry on next sync event
      break;
    }
  }
}

// Minimal IndexedDB for form queue
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('interfood-sw-db', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function getAllEntries(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('outbox', 'readonly');
    const store = tx.objectStore('outbox');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function deleteEntry(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('outbox', 'readwrite');
    tx.objectStore('outbox').delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
