const cacheName = 'supermario64pcportgamesnstuff';

self.addEventListener('supermario64pcportgamesnstuff', function(e) {
 e.waitUntil(
   caches.open('supermario64pcportgamesnstuff').then(function(cache) {
     return cache.addAll([
      '/',
      '/sm64.us.f3dex2e.wasm',
      '/index.html',
      '/sm64.us.f3dex2e.js'
     ]);
   })
 );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open('supermario64pcportgamesnstuff'); // cacheName
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;
      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});


//<script>
//if('serviceWorker' in navigator) {
  //navigator.serviceWorker
           //.register('/sw.js')
           //.then(function() { console.log("Service Worker Registered"); });
//}
//</script>
