'use strict';

import { GameCanvas } from "./game.canvas.js";
import { GameCore } from "./game.core.js";
// import { GameAnim } from "./game.anim.js";
// import { GameUi } from "./game.ui.js";

import { ResourceImage } from "./resource.image.js";
// import { ResourceFont } from "./resource.font.js";
// import { ResourceSound } from "./resource.sound.js";

import { ReversiReversi } from "./reversi.reversi.js";
// import { ReversiCanvas } from "./reversi.canvas.js";

const game = {
  core: new GameCore(),
  canvas: new GameCanvas(),
  // anim: new GameAnim(),
  // ui: new GameUi(),
};

const resource = {
  image: new ResourceImage(),
  // font: new ResourceFont(),
  // sound: new ResourceSound(),
};

const reversi = {
  reversi: new ReversiReversi(),
  // canvas: new ReversiCanvas(),
};

export class ReversiCanvas {
  constructor() {
    this._gcnvs = game.canvas;
    this._gcr = game.core;
    this._imgs = resource.image.imgs;
    this._rvs = null;
    this._cntx = null;
    this._sqSz = null;
    // キャンバス系オブジェクト
    this.c = null;
    // レイアウト系オブジェクト
    this.l = {
      sqSz: 0,
      brdX: 0, brdY: 0, // 盤面X,Y位置
      brdW: 0, brdH: 0,	// 盤面横幅,高さ
      pScr: [
        {x: 0, y: 0, w: 0, algn: 'left'},
        {x: 0, y: 0, w: 0, algn: 'right'},
      ],
      fntSz: 0,
      fntFmly: 'ArchivoBlack',
    };
  }
  /**
   * キャンバスの初期化
   */
  initCnvs() {
    this._rvs = reversi.reversi;
    // キャンバス系オブジェクトを作成
    const id = 'reversi';
    const sz = this._gcr.getFitSz(10, 11);
    let scl = 1;
    if (sz.w <= 600) {
      scl = 2;
    }
    const c = this.c = this._gcnvs.initCnvs(id, sz.w, sz.h, scl);
    this._cntx = c.cntx;
    // レイアウトを初期化
    const w = c.w;
    const h = c.h;
    const l = this.l;
    l.sqSz = (c.w * 0.1) | 0;
    l.brdW = l.sqSz * this._rvs.w;
    l.brdH = l.sqSz * this._rvs.h;
    l.brdX = ((w - l.brdW) / 2) | 0;
    l.brdY = l.sqSz * 2;
    l.pScr[0].x = l.brdX;
    l.pScr[1].x = l.brdX + l.brdW;
    l.pScr[0].y = l.pScr[1].y = l.sqSz * 1;
    l.pScr[0].w = l.pScr[1].w = l.brdW * 0.35;
    l.fntSz = l.sqSz * 0.9;
    this._sqSz = l.sqSz;
  }

  /**
   * 背景描画
   */
  drwBg(img) {
    // this._cntx.fillStyle = this._cntx.createPattern(this._imgs.bg, 'repeat');
    this._cntx.fillStyle = this._cntx.createPattern(img, 'repeat');
    this._cntx.fillRect(0, 0, this.c.w, this.c.h);
  }
}
