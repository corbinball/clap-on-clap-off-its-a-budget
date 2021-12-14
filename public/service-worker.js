const CACHE_NAME = "static-cache-money-v2";
const DATA_CACHE_NAME = "data-cache-datmoney-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/index.js",
  "/manifest.webmanifest",
  "/style.css",
  "/db.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",

];


// install
self.addEventListener("install", function (evt) {
    evt.waitUntil(
      caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/transaction"))
    );
    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
  
    self.skipWaiting();
  });


// activate
self.addEventListener("activate", function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Old cache go bye bye", key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });