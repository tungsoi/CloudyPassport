/* Network-first so the home-screen app always gets the latest version; cache is only an offline fallback. */
var C='hcm-offline-v1';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r,{cache:'no-store'}).then(function(res){
    var copy=res.clone();caches.open(C).then(function(c){c.put(r,copy)});return res;
  }).catch(function(){return caches.match(r)}));
});
