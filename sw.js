// 이 앱(골프볼 트래커)은 배움퀘스트(levelplay)로 이사했습니다.
// 예전 기기에 남은 서비스워커를 스스로 지우는 파일입니다.
// 방식: NekR/self-destroying-sw (install -> skipWaiting, activate -> unregister -> 열린 창 새로고침)
// 추가: 이 앱 이름(golf-tracker-v…)의 캐시만 지웁니다. 같은 주소를 쓰는 다른 앱(배움퀘스트 등)의 캐시는 건드리지 않습니다.
var OWN = /^golf-tracker-v\d+(-[a-z0-9]+)*$/;
self.addEventListener('install', function () {
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return OWN.test(k); }).map(function (k) { return caches.delete(k); }));
      })
      .catch(function () {})
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (clients) {
        clients.forEach(function (c) {
          try { if (c.navigate) c.navigate(c.url).catch(function () {}); } catch (err) {}
        });
      })
      .catch(function () {})
  );
});
