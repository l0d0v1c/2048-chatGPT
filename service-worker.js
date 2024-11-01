const CACHE_NAME = '2048-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js'
  // Ajoutez ici tous les fichiers à mettre en cache
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Ouverture du cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - renvoie la ressource mise en cache
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});