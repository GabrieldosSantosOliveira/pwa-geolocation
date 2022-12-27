let cacheName = 'ProvaRenato';
let filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './css/reset.css',
  './js/main.js'
];
// inicializando a service worker e fazendo o dowload do conteudo da aplicação

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});
// disponibilizando o conteudo quando estiver offline
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
