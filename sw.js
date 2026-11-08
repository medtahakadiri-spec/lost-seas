const C='lostseas-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./index.html','./manifest.json','./icon-192.png','./icon-512.png'])))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const same=new URL(e.request.url).origin===location.origin;
const store=r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r};
if(same)e.respondWith(fetch(e.request).then(store).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(store)))});
