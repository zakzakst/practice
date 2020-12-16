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
   * 盤面XYを座標XYに変換
   */
  xyToReal(x, y) {
    const rX = this.l.brdX + this._sqSz * x;
    const rY = this.l.brdY + this._sqSz * y;
    return {
      x: rX,
      y: rY,
    };
  }

  /**
   * 背景描画
   */
  drwBg(img) {
    // this._cntx.fillStyle = this._cntx.createPattern(this._imgs.bg, 'repeat');
    this._cntx.fillStyle = this._cntx.createPattern(img, 'repeat');
    this._cntx.fillRect(0, 0, this.c.w, this.c.h);
  }

  /**
   * 1マス描画
   */
  drwSq(x, y) {
    const r = this.xyToReal(x, y);
    // マージン アウト、イン
    let mO = 1;
    let mI = 2;
    if (this._sqSz >= 60) {
      mO = 2;
    }

    this._cntx.fillStyle = '#000';
    this._cntx.fillRect(r.x, r.y, this._sqSz, this._sqSz);

    this._cntx.fillStyle = '#ffb900';
    this._gcnvs.fllMrgnRct(this._cntx, r.x, r.y, this._sqSz, this._sqSz, mO);

    this._cntx.fillStyle = '#fff05b';
    this._gcnvs.fllMrgnRct(this._cntx, r.x, r.y, this._sqSz - mI, this._sqSz - mI, mO);

    this._cntx.fillStyle = '#086319';
    const rct = this._gcnvs.fllMrgnRct(this._cntx, r.x, r.y, this._sqSz, this._sqSz, mO + mI);
    const w = rct.w;
    const h = rct.h;

    this._cntx.save();
    this._cntx.globalAlpha = 0.1;
    this._cntx.fillStyle = '#0eb32d';

    this._cntx.save();
    this._cntx.translate(rct.x, rct.y);
    this._gcnvs.fllPth(this._cntx, w * 0.4, 0, w * 0.1, h, w * 0.6, h, w * 0.9, 0);
    this._cntx.restore();

    this._cntx.save();
    this._cntx.translate(rct.x, rct.y);
    this._gcnvs.fllPth(this._cntx, 0, h * 0.1, w, h * 0.4, w, h * 0.9, 0, h * 0.6);
    this._cntx.restore();

    // this._cntx.restore();
  }

  /**
   * 盤面全描画
   */
  drwSqAll() {
    const l = this.l;
    // マス周辺の描画
    this._cntx.fillStyle = '#000';
    this._gcnvs.fllMrgnRct(this._cntx, l.brdX, l.brdY, l.brdW, l.brdH, -2);
    // マスの描画
    this._rvs.scnBrd((i, x, y) => {
      this.drwSq(x, y);
    });
  }
}
