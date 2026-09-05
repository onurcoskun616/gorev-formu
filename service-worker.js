// Görev Formu Oluşturucu — service worker
// Basit "app shell" önbellekleme: uygulama dosyaları offline'da da açılsın diye.
var CACHE_NAME = "gorev-formu-v1";
var APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];
var CDN_XLSX = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(APP_SHELL);
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(event){
  var req = event.request;
  if(req.method !== "GET") return;

  // xlsx kütüphanesi: cache-first, sonra ağdan çek + önbelleğe al (offline'da da Excel açılabilsin)
  if(req.url === CDN_XLSX){
    event.respondWith(
      caches.match(req).then(function(cached){
        if(cached) return cached;
        return fetch(req).then(function(res){
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(req, copy); });
          return res;
        }).catch(function(){ return cached; });
      })
    );
    return;
  }

  // uygulama dosyaları: cache-first, yoksa ağdan dene
  event.respondWith(
    caches.match(req).then(function(cached){
      return cached || fetch(req).then(function(res){
        var copy = res.clone();
        if(res.ok && req.url.startsWith(self.location.origin)){
          caches.open(CACHE_NAME).then(function(cache){ cache.put(req, copy); });
        }
        return res;
      }).catch(function(){
        if(req.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
