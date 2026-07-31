const CACHE_NAME = 'netvistastudio-shell-v4';

const APP_SHELL = [
  '/',
  '/applications/',
  '/site.webmanifest',
  '/assets/css/style.css',
  '/assets/css/home.css',
  '/assets/css/applications.css',
  '/assets/js/app.js',
  '/assets/js/applications.js',
  '/assets/js/data/catalog.js',
  '/assets/js/modules/dialog.js',
  '/assets/js/modules/site-shell.js',
  '/assets/images/brand/icon-192.png',
  '/assets/images/brand/icon-512.png',
  '/assets/images/brand/apple-touch-icon.png',
  '/assets/images/photos/netvistastudio-logo.png',
  '/assets/images/photos/dark-echoes.jpg',
  '/assets/images/photos/final-lesson.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(url.pathname.startsWith('/applications') ? '/applications/' : '/'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      return response;
    }))
  );
});
