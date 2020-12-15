'use strict';

import { GameCanvas } from "./module/game.canvas.js";
import { GameCore } from "./module/game.core.js";

import { ResourceImage } from "./module/resource.image.js";

const game = {
  core: new GameCore(),
  canvas: new GameCanvas(),
};

const resource = {
  image: new ResourceImage(),
};

//====================
// 000 xxxxx
// (() => {})();



//====================
// 202 load image
(() => {
  // リソース（画像）の読み込み
  const r = [];
  r.push(resource.image.load('bg', 'img/bg.png'));
  r.push(resource.image.load('_tkn0', 'img/token0.png'));
  r.push(resource.image.load('_tkn1', 'img/token1.png'));
  // $.when を利用して、$.Deferred の全処理が終わるのを待つ
  $.when.apply($, r).then(() => {
    const imgs = resource.image.imgs;
    for (let key in imgs) {
      console.log(imgs[key]);
      $('body').append(key).append(imgs[key]);
    }
  });
})();


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
