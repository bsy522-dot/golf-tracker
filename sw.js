var CACHE_NAME = 'golf-tracker-v24';
var PRECACHE = [
  './',
  './index.html',
  './golf-ball-tracker.html',
  './v6_patch.js',
  './v7_patch.js',
  './v8_patch.js',
  './v9_patch.js',
  './v10_patch.js',
  './v11_patch.js',
  './v12_patch.js',
  './v13_patch.js',
  './v14_patch.js',
  './v15_patch.js',
  './v16_patch.js',
  './v17_patch.js',
  './v18_patch.js',
  './v19_patch.js',
  './v20_patch.js',
  './v21_patch.js',
  './v22_patch.js',
  './v23_patch.js',
  './v24_patch.js',
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
            if (html.indexOf('v24_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v24_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v23_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v23_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v22_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v22_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v21_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v21_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v20_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v20_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v19_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v19_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v18_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v18_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v17_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v17_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v16_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v16_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v15_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v15_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v14_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v14_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v13_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v13_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v12_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v12_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v11_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v11_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v10_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v10_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v9_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v9_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v8_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v8_patch.js"><\/script>\n</body>');
            }
            if (html.indexOf('v7_patch.js') === -1 && html.indexOf('</body>') !== -1) {
              html = html.replace('</body>', '<script src="v7_patch.js"><\/script>\n</body>');
            }
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
              if (html.indexOf('v24_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v24_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v23_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v23_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v22_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v22_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v21_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v21_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v20_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v20_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v19_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v19_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v18_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v18_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v17_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v17_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v16_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v16_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v15_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v15_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v14_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v14_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v13_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v13_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v12_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v12_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v11_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v11_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v10_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v10_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v9_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v9_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v8_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v8_patch.js"><\/script>\n</body>');
              }
              if (html.indexOf('v7_patch.js') === -1 && html.indexOf('</body>') !== -1) {
                html = html.replace('</body>', '<script src="v7_patch.js"><\/script>\n</body>');
              }
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
