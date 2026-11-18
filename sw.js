const CACHE='cancel-fax-v2';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// 画面はネット優先（更新をすぐ反映）、つながらない時はキャッシュ
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
