/* Keeps the app on the phone so it opens with no signal.
   Bump VERSION on every release so phones pick up the new files. */
const VERSION = 'parts-camera-v2';
const SHELL = [
  './', './index.html', './manifest.webmanifest', './jszip.min.js',
  './icon-192.png', './icon-512.png',
  './barlow-400.woff2', './barlow-600.woff2', './barlow-700.woff2',
  './barlow-semi-condensed-700.woff2', './ibm-plex-mono-500.woff2', './ibm-plex-mono-600.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Pages: serve the cached app straight away, refresh it in the background.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(hit => {
        const net = fetch(req).then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); }
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
