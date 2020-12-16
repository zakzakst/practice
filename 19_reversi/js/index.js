'use strict';

import { GameCanvas } from "./module/game.canvas.js";
import { GameCore } from "./module/game.core.js";
import { GameAnim } from "./module/game.anim.js";
import { GameUi } from "./module/game.ui.js";

import { ResourceImage } from "./module/resource.image.js";
import { ResourceFont } from "./module/resource.font.js";
import { ResourceSound } from "./module/resource.sound.js";

const game = {
  core: new GameCore(),
  canvas: new GameCanvas(),
  anim: new GameAnim(),
  ui: new GameUi(),
};

const resource = {
  image: new ResourceImage(),
  font: new ResourceFont(),
  sound: new ResourceSound(),
};


//====================
// 000 xxxxx
// (() => {
// })();


//====================
// 207 scale image
(() => {
  // リソース（画像）の読み込み
  const r = [];
  r.push(resource.image.load('_tkn0', 'img/token0.png'));
  // 読み込み待機
  $.when.apply($, r).then(() => {
    // 縦横比固定でキャンバス作成
    const sz = game.core.getFitSz(10, 11);
    const c = game.canvas.initCnvs('reversi', sz.w, sz.h);
    // 全面色塗り
    c.cntx.fillStyle = '#aff';
    c.cntx.fillRect(0, 0, c.w, c.h);
    // 変数の初期化
    const imgTknSrc = resource.image.imgs._tkn0;
    const srcW = imgTknSrc.width;
    const srcH = imgTknSrc.height;
    const dstW = srcW / 3 | 0;
    const dstH = srcH / 3 | 0;
    // 1/3サイズ描画
    c.cntx.drawImage(imgTknSrc, 0, 0, srcW, srcH, 0, (c.h - dstH) / 2, dstW, dstH);
    // 1/3サイズ生成 描画
    const imgTknGen = game.canvas.getScaledImg(imgTknSrc, 0, 0, srcW, srcH, dstW, dstH);
    c.cntx.drawImage(imgTknGen, dstW, (c.h - dstH) / 2);
  });
})();


//====================
// 206 ui
// (() => {
//   // 縦横比固定でキャンバス作成
//   const sz = game.core.getFitSz(10, 11);
//   const c = game.canvas.initCnvs('reversi', sz.w, sz.h, 1);
//   // アニメ追加
//   game.anim.add('bg', tm => {
//     // 全面色塗り
//     c.cntx.fillStyle = '#faa';
//     c.cntx.fillRect(0, 0, c.w, c.h);
//   });
//   // UI初期化
//   game.ui.init(c);
//   // ボタン追加1
//   game.ui.addBtn('btn1', 'Button1', 10, 10, 200, 50, () => {
//     game.ui.rmvBtn('btn1');
//   });
//   // ボタン追加2
//   game.ui.addBtn('btn2', 'Button2', 10, 60, 200, 50, () => {
//     game.ui.rmvBtn('btn1');
//   });
//   // アニメ開始
//   game.anim.strt();
// })();


//====================
// 205 anim
// (() => {
//   // 縦横比固定でキャンバス作成
//   const sz = game.core.getFitSz(10, 11);
//   const c = game.canvas.initCnvs('reversi', sz.w, sz.h);
//   // アニメ追加
//   game.anim.add('bg', (tm) => {
//     // 全面色塗り
//     c.cntx.fillStyle = '#faa';
//     c.cntx.fillRect(0, 0, c.w, c.h);
//   });
//   game.anim.add('rct1', (tm) => {
//     // 矩形色塗り1
//     c.cntx.fillStyle = '#aaf';
//     c.cntx.fillRect(
//       tm.sum % c.w,
//       tm.sum % c.w,
//       c.w * 0.2,
//       c.h * 0.2
//     );
//   });
//   game.anim.add('rct2', (tm) => {
//     // 矩形色塗り2
//     c.cntx.fillStyle = '#afa';
//     c.cntx.fillRect(
//       tm.sum * 0.5 % c.w,
//       tm.sum * 0.5 % c.w,
//       c.w * 0.15,
//       c.h * 0.15
//     );
//   });
//   // アニメ開始
//   game.anim.strt();
//   // アニメ削除
//   setTimeout(() => {
//     game.anim.rmv('rct2');
//   }, 1000);
//   // アニメ停止
//   setTimeout(() => {
//     game.anim.stp();
//   }, 2000);
// })();


//====================
// 204 load sound
// (() => {
//   // リソース（音声）の読み込み
//   const r = [];
//   r.push(resource.sound.load('se0', 'snd/se0', 'se'));
//   r.push(resource.sound.load('se1', 'snd/se1', 'se'));
//   r.push(resource.sound.load('bgm0', 'snd/bgm0'));
//   r.push(resource.sound.load('bgm1', 'snd/bgm1'));
//   r.push(resource.sound.load('win', 'snd/win'));
//   r.push(resource.sound.load('lose', 'snd/lose'));
//   // $.when を利用して、$.Deferred の全処理が終わるのを待つ
//   $.when.apply($, r).then(() => {
//     // ボタンの作成
//     const css = {
//       width: '200px',
//       height: '50px',
//       display: 'block',
//     };
//     // 通常の開始、停止、一時停止
//     $('<button>')
//       .text('開始')
//       .click(() => {
//         resource.sound.play('bgm0');
//       })
//       .css(css)
//       .appendTo('body');
//     $('<button>')
//       .text('停止')
//       .click(() => {
//         resource.sound.stop('bgm0');
//       })
//       .css(css)
//       .appendTo('body');
//     $('<button>')
//       .text('一時停止')
//       .click(() => {
//         resource.sound.pause('bgm0');
//       })
//       .css(css)
//       .appendTo('body');
//     $('<hr>').appendTo('body');
//     // ループ開始、停止
//     $('<button>')
//       .text('ループ開始')
//       .click(() => {
//         resource.sound.playLoop('se0-0');
//       })
//       .css(css)
//       .appendTo('body');
//     $('<button>')
//       .text('停止')
//       .click(() => {
//         resource.sound.stop('se0-0');
//       })
//       .css(css)
//       .appendTo('body');
//     $('<hr>').appendTo('body');
//     // SE開始、BGM開始/切り替え
//     $('<button>')
//       .text('SE開始')
//       .click(() => {
//         resource.sound.playSE('se1');
//       })
//       .css(css)
//       .appendTo('body');
//     let cnt = 0;
//     $('<button>')
//       .text('BGM開始/切り替え')
//       .click(() => {
//         if (cnt === 0) {
//           resource.sound.playBGM('bgm0');
//         } else {
//           resource.sound.playBGM('bgm1');
//         }
//         cnt = 1 - cnt;
//       })
//       .css(css)
//       .appendTo('body');
//   });
// })();


//====================
// 203 load font
// (() => {
//   // リソース（フォント）の読み込み
//   const r = [];
//   r.push(resource.font.load('serif', 'ArchivoBlack, serif'));
//   // $.when を利用して、$.Deferred の全処理が終わるのを待つ
//   $.when.apply($, r).then(() => {
//     // 縦横比固定でキャンバス作成
//     const sz = game.core.getFitSz(10, 11);
//     const c = game.canvas.initCnvs('reversi', sz.w, sz.h);
//     // 文字描画
//     c.cntx.fillStyle = '#000';
//     c.cntx.textAlign = 'center';
//     c.cntx.textBaseline = 'middle';
//     c.cntx.font = `${(c.w * 0.1 | 0)}px 'ArchivoBlack'`;
//     c.cntx.fillText('Abcdefghijklmn', c.w / 2, c.h / 2);
//   });
// })();


//====================
// 202 load image
// (() => {
//   // リソース（画像）の読み込み
//   const r = [];
//   r.push(resource.image.load('bg', 'img/bg.png'));
//   r.push(resource.image.load('_tkn0', 'img/token0.png'));
//   r.push(resource.image.load('_tkn1', 'img/token1.png'));
//   // $.when を利用して、$.Deferred の全処理が終わるのを待つ
//   $.when.apply($, r).then(() => {
//     const imgs = resource.image.imgs;
//     for (let key in imgs) {
//       console.log(imgs[key]);
//       $('body').append(key).append(imgs[key]);
//     }
//   });
// })();


//====================
// 201 init canvas
// (() => {
//   // 縦横比固定でキャンバス作成
//   const id = 'reversi';
//   const sz = game.core.getFitSz(10, 11);
//   const c = game.canvas.initCnvs(id, sz.w, sz.h);
//   // 全面色塗り
//   c.cntx.fillStyle = "#faa";
//   c.cntx.fillRect(0, 0, c.w, c.h);
// })();
