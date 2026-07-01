const CACHE_NAME = 'interfood-v2';
const STATIC_CACHE = 'interfood-static-v2';
const IMAGE_CACHE = 'interfood-images-v2';
const OFFLINE_URL = '/offline';
const PRECACHE_URLS = ['/', '/offline', '/menu', '/services', '/contacts', '/about', '/logo.svg', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {})));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((n) => ![CACHE_NAME, STATIC_CACHE, IMAGE_CACHE].includes(n)).map((n) => caches.delete(n)))));
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.hostname !== self.location.hostname) return;
  if (/\.(jpg|jpeg|png|webp|avif|svg|gif|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(IMAGE_CACHE, request));
  } else if (/\.(js|css|woff2?|ttf)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(STATIC_CACHE, request));
  } else if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(CACHE_NAME, request));
  }
});
async function cacheFirst(name, req) {
  const c = await caches.match(req); if (c) return c;
  try { const r = await fetch(req); if (r && r.status === 200) { const cl = r.clone(); caches.open(name).then((cache) => cache.put(req, cl)); } return r; } catch { return new Response('', { status: 503 }); }
}
async function staleWhileRevalidate(name, req) {
  const c = await caches.match(req);
  const fp = fetch(req).then((r) => { if (r && r.status === 200) { const cl = r.clone(); caches.open(name).then((cache) => cache.put(req, cl)); } return r; }).catch(() => c);
  return c || fp;
}
async function networkFirst(req) {
  try { const r = await fetch(req); if (r && r.status === 200) { const cl = r.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(req, cl)); } return r; } catch { const c = await caches.match(req); return c || caches.match(OFFLINE_URL); }
}
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(self.registration.showNotification(data.title || 'Интерфуд', {
    body: data.body || '', icon: '/icons/icon-192.png', vibrate: [200, 100, 200],
    data: { url: data.url || '/' }, actions: [{ action: 'open', title: 'Открыть' }, { action: 'close', title: 'Закрыть' }],
  }));
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if (c.url.includes(self.location.origin) && 'focus' in c) { c.navigate(event.notification.data?.url || '/'); return c.focus(); } }
    return self.clients.openWindow(event.notification.data?.url || '/');
  }));
});
