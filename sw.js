// 연습장처럼 신호가 약한 곳에서도 열리도록 분석 엔진을 기기에 담아 둔다
const CACHE = "swinglab-live-v1";
const ENGINE = [
  "mp/vision_bundle.mjs",
  "mp/wasm/vision_wasm_internal.js",
  "mp/wasm/vision_wasm_internal.wasm",
  "mp/pose_landmarker_lite.task",
];
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([...SHELL, ...ENGINE])).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  if (url.pathname.includes("/mp/")) {
    // 엔진 파일: 캐시 먼저
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    })));
    return;
  }
  // 화면: 네트워크 먼저 (새 버전이 바로 보이게), 안 되면 캐시
  e.respondWith(fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
