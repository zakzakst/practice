'use strict';

(() => {
  const id = 'test';
  const btn = document.getElementById(id);
  btn.addEventListener('click', getPos);
})();

// 位置情報の取得
function getPos() {
  navigator.geolocation.getCurrentPosition(pos => {
    const date = new Date(pos.timestamp);
    const geoTextArr = [
      `緯度：${pos.coords.latitude}`,
      `経度：${pos.coords.longitude}`,
      `高度：${pos.coords.altitude}`,
      `位置精度：${pos.coords.accuracy}`,
      `高度精度：${pos.coords.altitudeAccuracy}`,
      `移動方向：${pos.coords.heading}`,
      `速度：${pos.coords.speed}`,
      `取得時刻：${date.toLocaleString()}`,
    ];
    console.log(geoTextArr);
  });
}
