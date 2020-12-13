'use strict';
import QRCode from 'qrcode';

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
