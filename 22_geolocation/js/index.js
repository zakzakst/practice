'use strict';

(() => {
  const id = 'test';
  const btn = document.getElementById(id);
  // btn.addEventListener('click', getPos);
  btn.addEventListener('click', () => {
    // キロメートルの距離が返ってくるのでメートルに変換
    console.log(distance(35.8627, 139.6072, 35.8547, 139.6022) * 1000);
  });
  // showMap();
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

// Leafletで地理院地図を表示
function showMap() {
  const point = [35.8627, 139.6072];

  // 地図の表示
  const map = L.map('map', {
    // center: point,
    center: L.latLng(point),
    zoom: 15,
    // zoomControl: false,
    // layers: [], // 参考：https://business.mapfan.com/blog/detail/1571 （※こっち使ったほうがいいかもしれない）
  });
  // 使える地図URL（おすすめしない）
  // const mapUrlsEx = [
  //   'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
  //   'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  //   'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  //   'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
  //   'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
  //   'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  //   'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  //   'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  //   'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  //   'http://www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
  //   'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
  //   'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
  //   'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png',
  // ];
  // 使える地図URL（おすすめ）
  const mapUrls = [
    'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', // 施設名有り
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // 施設名有り
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', // 番地記載
    'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', // 写真
    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png', // 文字無し／白黒
  ]
  map.addLayer(
    L.tileLayer(mapUrls[0])
  );

  // デフォルトマーカーの変更
  delete  L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: '/images/icon-pin.svg',
    iconRetinaUrl: '/images/icon-pin.svg',
    shadowUrl: null
  })

  // マーカーの追加
  const contents = 'ポップアップ（HTML可）';
  const popup = L.popup({maxWidth: 550}).setContent(contents);
  map.addLayer(
    L.marker(point, {
      title: 'マーカーの名前'
    })
      .bindPopup(popup)
      // .bindTooltip('ツールチップ')
  );

  // マーカーの追加（div要素 ※CSSでコントロール）
  const icon = L.divIcon({
    className: 'icon',
    iconAnchor: [12, 12],
  });
  map.addLayer(
    L.marker(point, {
      icon: icon
    })
  );

  // 円形の追加
  map.addLayer(
    L.circle(point, {
      radius: 300,
      color: '#f00',
      opacity: .5,
      fillOpacity: .1,
      // fill: false,
      weight: 2
    })
  );

  // 線の追加
  const line = [
    [35.8627, 139.6072],
    [35.8637, 139.6082],
    [35.8647, 139.6022],
    [35.8657, 139.6042],
    [35.8667, 139.6042],
  ];
  map.addLayer(
    L.polyline(line, {
      color: '#0f0',
      opacity: .5,
      weight: 5,
    })
  );

  // 多角形の追加
  const polygon = [
    [35.8527, 139.6072],
    [35.8547, 139.6022],
    [35.8657, 139.6042],
    [35.8667, 139.6142],
  ];
  const polygonLayer = L.polygon(polygon, {
    color: '#00f',
    opacity: .5,
    fillOpacity: .1,
    // fill: false,
    weight: 2
  });
  polygonLayer.on('click', () => {
    // クリック時の挙動を記載（※ページ遷移させるなど）
    alert('多角形をクリックしました');
  });
  map.addLayer(polygonLayer);

  // 線の描画
  const drawLine = L.polyline([], {
    color: '#000',
    weight: 5,
    bubblingMouseEvents: false,
  });
  map.addLayer(drawLine);
  map.on('click', e => {
    drawLine.addLatLng(e.latlng);
  });

  // レイヤーの表示・非表示
  const layerCircle = radius => L.circle(point, {
    radius: radius,
    color: '#000',
    opacity: .5,
    fill: false,
    weight: 2
  });
  const layerCircle1 = layerCircle(400);
  const layerCircle2 = layerCircle(500);
  const layerCircle3 = layerCircle(600);
  const layers = {
    '円1': layerCircle1,
    '円2': layerCircle2,
    '円3': layerCircle3,
  };
  // 初期表示したいレイヤーは追加スクリプトを記述
  map.addLayer(layerCircle1);
  L.control.layers(null, layers, {
    position: 'bottomright', // 参考：https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.Control/#control-positions
    collapsed: false,
  }).addTo(map);
  // 第一引数にレイヤーを入れるとラジオボタンでの選択になる
  // L.control.layers(layers, null, {
  //   collapsed: false,
  // }).addTo(map);

  // レイヤーの削除
  // map.removeLayer(layerCircle1);
  layerCircle1.remove();

  // レイヤーの移動
  layerCircle1.setLatLng([35.8547, 139.6022]);

  // マップ中心の移動
  map.panTo([35.8547, 139.6022]);
}

// 二点間の距離計算
function distance(lat1, lng1, lat2, lng2) {
  lat1 *= Math.PI / 180;
  lng1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  lng2 *= Math.PI / 180;
  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}
