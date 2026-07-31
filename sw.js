const CACHE_NAME = 'netvistastudio-shell-v3';
const APP_SHELL = [
  '/',
  '/site.webmanifest',
  '/assets/css/style.css',
  '/assets/js/app.js',
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
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/')));
  }
});
