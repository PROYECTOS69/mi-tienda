/* Service worker de la TIENDA (alcance: carpeta /tienda/).
   Red primero con copia de respaldo sin conexión. Solo archivos del propio sitio:
   el catálogo y los pedidos (Supabase) nunca se guardan en la caché. */
const VERSION = 'cc-tienda-v2';
const SHELL = ['./', 'index.html', 'tienda.webmanifest', 'privacidad.html', 'terminos.html', 'cookies.html', 'reembolsos.html',
  '../config.js', '../tailwind.css', 'tienda-icon-192.png', 'tienda-icon-512.png', 'tienda-icon-maskable.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('cc-tienda-') && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});
