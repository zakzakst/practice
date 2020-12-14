'use strict';
import QRCode from 'qrcode';
import jsQR from 'jsqr';

// スクリプト実行
(() => {
  const text = 'This is sample text';
  const options = {
    margin: 0,
    width: 200,
    color: {
      dark: '#000', // QRコード
      light: '#fff', // 背景
    },
  };
  insertQrCode(text, options);
  createQrCode(text, options);
  startStreamVideo();
})();

// 元あるcanvas要素にQRコードを挿入する
function insertQrCode(text, options) {
  const canvas = document.getElementById('canvas');
  QRCode.toCanvas(canvas, text, options, error => {
    if (error) console.error(error);
  });
}

// canvas要素のQRコードを作成する
function createQrCode(text, options) {
  const canvas = document.createElement('canvas');
  document.getElementById('canvas-wrapper').appendChild(canvas);
  QRCode.toCanvas(canvas, text, options, error => {
    if (error) console.error(error);
  });
}

// デバイスのカメラ利用開始
function startStreamVideo() {
  const video = document.getElementById('video');
  const result = document.getElementById('result');
  navigator.mediaDevices.getUserMedia({
    audio: false,
    // video: true,
    video: {
      // facingMode: 'environment',
      facingMode: 'user'
    },
  }).then(stream => {
    video.srcObject = stream;
    qrParse(video).then(res => {
      result.value = res;
    });
  }).catch(err => {
    console.log(err);
  });
};

// デバイスのカメラ利用停止
function stopStreamedVideo(videoElem) {
  let stream = videoElem.srcObject;
  let tracks = stream.getTracks();

  tracks.forEach(function(track) {
    track.stop();
  });

  videoElem.srcObject = null;
}

// QRコードの解析
function qrParse(video) {
  const canvas = new OffscreenCanvas(240, 320);
  const render = canvas.getContext("2d");

  return new Promise((res) => {
    const loop = setInterval(() => {
      render.drawImage(video, 0, 0, canvas.width, canvas.height);

      const img = render.getImageData(0, 0, canvas.width, canvas.height);
      const result = jsQR(img.data, img.width, img.height);

      if (result) {
        clearInterval(loop);
        stopStreamedVideo(video);
        return res(result.data);
      }
    }, 100);
  });
}
