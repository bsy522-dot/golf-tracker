var CACHE_NAME = 'golf-tracker-v6';
var PRECACHE = [
  './',
  './index.html',
  './golf-ball-tracker.html',
  './v6_patch.js',
  './manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  var url = e.request.url;

  if (url.endsWith('.html') || url.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then(function(resp) {
        if (resp.ok) {
          return resp.text().then(function(html) {
            if (html.indexOf('v6_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v6_patch.js"><\/script>\n</body>');
            }
            var newResp = new Response(html, {
              status: resp.status,
              statusText: resp.statusText,
              headers: {'Content-Type': 'text/html; charset=UTF-8'}
            });
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(e.request, newResp.clone());
            });
            return newResp;
          });
        }
        return resp;
      }).catch(function() {
        return caches.match(e.request).then(function(cached) {
          if (cached) {
            return cached.text().then(function(html) {
              if (html.indexOf('v6_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v6_patch.js"><\/script>\n</body>');
              }
              return new Response(html, {
                headers: {'Content-Type': 'text/html; charset=UTF-8'}
              });
            });
          }
          return new Response('<!DOCTYPE html><html><body><h1>Golf Tracker Offline</h1></body></html>', {
            headers: {'Content-Type': 'text/html; charset=UTF-8'}
          });
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request).then(function(resp) {
          if (resp.ok) {
            var clone = resp.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(e.request, clone);
            });
          }
          return resp;
        });
      })
    );
  }
});
