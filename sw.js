// Uygulama kabuğunu önbelleğe alır: şantiyede bağlantı kopsa da açılır.
// Her istekte önce sunucuya sorulur (cache: 'no-cache'); eski dosya ancak bağlantı yoksa kullanılır.
const C = 'sk-v3', FILES = ['./', 'index.html', 'config.js', 'galataport.xlsx', 'manifest.json', 'icon.svg'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(C).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))).catch(() => {}).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== C).map((x) => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.searchParams.has('u')) return;
  e.respondWith((async () => {
    try {
      const r = await fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' });
      if (r.ok) { const cp = r.clone(); e.waitUntil((async () => {
        const c = await caches.open(C);
        if (/\.js$/.test(u.pathname)) for (const k of await c.keys()) if (new URL(k.url).pathname === u.pathname && k.url !== e.request.url) await c.delete(k);
        await c.put(e.request, cp);
      })()); }
      return r;
    } catch (x) {
      const hit = (await caches.match(e.request)) || (await caches.match(e.request, { ignoreSearch: true }));
      return hit || (e.request.mode === 'navigate' && (await caches.match('index.html'))) || Response.error();
    }
  })());
});
