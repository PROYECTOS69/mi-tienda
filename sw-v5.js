/* Service worker del PANEL (alcance: raíz del sitio).
   - Red primero: siempre intenta traer la versión más nueva; si no hay internet usa la copia guardada.
   - Solo guarda archivos del propio sitio. Nunca guarda respuestas de Supabase ni de Cloudinary,
     así los datos de clientes y pedidos no quedan en la caché del teléfono.
   - Sube el número de VERSION cuando cambies archivos importantes. */
const VERSION = 'cc-admin-v11';
const SHELL = ['./', 'index.html', 'config.js', 'tailwind.css', 'manifest.webmanifest',
  'admin-icon-192.png', 'admin-icon-512.png', 'admin-icon-maskable.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('cc-admin-') && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;                     // terceros: no tocar
  const scope = new URL(self.registration.scope).pathname;
  if (url.pathname.startsWith(scope + 'tienda/')) return;              // la tienda tiene su propio worker
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});
