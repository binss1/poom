const B='eef3abe1',V='poom-'+B;
const FILES=['./','./index.html','./style.css','./content.js','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await Promise.all(FILES.map(async f=>{const r=await fetch(new Request(f+'?v='+B,{cache:'reload'}));if(!r.ok)throw new Error('precache '+f);await c.put(new URL(f,location.href).href,r)}));await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:true})).then(r=>r||fetch(e.request).catch(()=>caches.match(new URL('./index.html',location.href).href))))});
self.addEventListener('message',e=>{if(e.data==='ver'&&e.ports[0])e.ports[0].postMessage(B)});
