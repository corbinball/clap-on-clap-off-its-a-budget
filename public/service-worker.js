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
    // pre cache image data
    evt.waitUntil(
      caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/transaction"))
    );
      
    // pre cache all static assets
    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
  
    // tell the browser to activate this service worker immediately once it
    // has finished installing
    self.skipWaiting();
  });


  