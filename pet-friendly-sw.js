"use strict";

/*
PETS & DOGUE — Pet-Friendly Places
Service Worker

This service worker is intentionally lightweight.
It does not cache API calls, maps, geolocation or external services.
*/

const VERSION = "pets-dogue-pet-friendly-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  /*
  Do not interfere with:
  - Google Maps / Google Places
  - OpenStreetMap
  - external APIs
  - images or services hosted outside PETS & DOGUE
  */
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
  );
});
