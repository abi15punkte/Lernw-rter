const BUILD_ID = "__BUILD_ID__";
const CACHE_NAME = `lernwoerter-reset-${BUILD_ID}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./Gitter.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("lernwoerter-reset-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      ),
      self.clients.claim(),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const isNavigation =
    event.request.mode === "navigate" ||
    requestUrl.pathname.endsWith("/index.html");

  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then(async (response) => {
        if (response.ok) {
          const copy = response.clone();

          void caches.open(CACHE_NAME).then((cache) => {
            if (isNavigation) {
              return cache.put("./index.html", copy);
            }
            return cache.put(event.request, copy);
          });
        }

        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) =>
          cached ?? caches.match("./index.html")
        )
      )
  );
});
