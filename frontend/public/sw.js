const CACHE_NAME = 'meta-mij-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap',
  'https://customer-assets.emergentagent.com/job_maraton-juarez/artifacts/xy6stpkh_VARIANTES%20EDICION%2014_EDICION-%20VERDE%20LISTON%20MORADO%20copia.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
