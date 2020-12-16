'use strict';

import { GameCanvas } from "./game.canvas.js";
import { GameCore } from "./game.core.js";
import { GameAnim } from "./game.anim.js";

const game = {
  core: new GameCore(),
  canvas: new GameCanvas(),
  anim: new GameAnim(),
};

export class GameUi {
  constructor() {
    this.ga = null;
    this.gcnvs = null;
    this.c = {};
    this.l = {
      fntFmly: '',
    };
    this.fncs = {};
  }

  /**
   * 初期化
   */
  init(c, l) {
    this.ga = game.anim;
    this.gcnvs = game.canvas;
    $.extend(true, this.c, c);
    $.extend(true, this.l, l);
  }

  /**
   * ボタン追加
   */
  addBtn(nm, txt, x, y, w, h, cb) {
    const cntx = this.c.cntx;
    // マージン
    let m = w * 0.05;
    // 最少は4
    m = m < 4 ? 4 : m;
    const fntSz = (h - m * 2) | 0;
    let isHover = false;
    const scl = this.gcnvs.scl;
    // アニメ追加
    this.ga.add(nm, () => {
      // 描画の一時保存
      cntx.save();
      // 外枠の描画
      cntx.fillStyle = isHover ? '#222' : '#000';
      this.gcnvs.pthRRct(cntx, x, y, w, h, m);
      cntx.fill();
      // 内側の描画
      cntx.fillStyle = isHover ? '#888' : '#fff';
      this.gcnvs.pthRRct(cntx, x + 2, y + 2, w - 4, h - 4, m - 2);
      cntx.fill();
      // テキストの描画
      cntx.fillStyle = isHover ? '#fff' : '#000';
      cntx.textAlign = 'center';
      cntx.textBaseline = 'middle';
      cntx.font = `${fntSz}px '${this.l.fntFmly}'`;
      cntx.fillText(txt, x + w * 0.5, y + h * 0.5, w - m * 2);
      // 再描画
      cntx.restore();
    });
    // クリック用の処理
    const fncClck = e => {
      if (game.core.inRng(e.offsetX * scl, e.offsetY * scl, x, y, w, h)) {
        cb();
      }
    };
    // hover用の処理
    const fncMMv = e => {
      isHover = game.core.inRng(e.offsetX * scl, e.offsetY * scl, x, y, w, h);
    };
    const fncMLv = e => {
      isHover = false;
    };
    // 処理を設定
    $(this.c.cnvs).on('click', fncClck);
    $(this.c.cnvs).on('mousemove', fncMMv);
    $(this.c.cnvs).on('mouseleave', fncMLv);
    // 処理を記録
    this.fncs[`${nm}:click`] = fncClck;
    this.fncs[`${nm}:mousemove`] = fncMMv;
    this.fncs[`${nm}:mouseleave`] = fncMLv;
  }

  /**
   * ボタン破棄
   * @param nm ボタン名
   */
  rmvBtn(nm) {
    this.ga.rmv(nm);
    // 処理を除去
    $(this.c.cnvs).off('click', this.fncs[`${nm}:click`]);
    $(this.c.cnvs).off('mousemove', this.fncs[`${nm}:mousemove`]);
    $(this.c.cnvs).off('mouseleave', this.fncs[`${nm}:mouseleave`]);
    // 処理を削除
    delete this.fncs[`${nm}:click`];
    delete this.fncs[`${nm}:mousemove`];
    delete this.fncs[`${nm}:mouseleave`];
  }
};
