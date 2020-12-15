'use strict';

export class GameAnim {
  constructor() {
    this.anmId = null;
    this.updtArr = []; // 配列 {nm: 名前, fnc: 関数}
    this.tm = {
      sum: 0,
      old: null,
      now: 0,
      dif: 0,
    };
  }

  /**
   * アニメーション実行/停止用関数
   */
  rqstAnmFrm(cb) {
    const id = (
      window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(cb) {
        return window.setTimeout(cb, 1000 / 60);
      }
    )(cb);
    return id;
  }
  cnclAnmFrm(id) {
    (
      window.cancelAnimationFrame              ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame    ||
      window.oCancelRequestAnimationFrame      ||
      window.msCancelRequestAnimationFrame     ||
      window.clearTimeout
    )(id)
  }

  /**
   * アニメーションの開始
   */
  strt() {
    const anmFnc = () => {
      this.updt();
      this.anmId = this.rqstAnmFrm(anmFnc);
    }
    anmFnc();
  }

  /**
   * アニメーションの停止
   */
  stp() {
    if (this.anmId === null) return;
    this.cnclAnmFrm(this.anmId);
  }

  /**
   * アニメーションの更新
   */
  updt() {
    // 差分時間と経過時間を計算
    this.tm.now = new Date();
    this.tm.dif = this.tm.old === null ? 0 : (this.tm.now - this.tm.old);
    this.tm.sum += this.tm.dif;
    this.tm.old = this.tm.now;
    // 更新配列を全て実行
    for (let i = 0; i < this.updtArr.length; i++) {
      this.updtArr[i].fnc(this.tm);
    }
  }

  /**
   * アニメーションの追加
   * @param nm アニメーション名
   * @param fnc アニメーション関数
   */
  add(nm, fnc) {
    this.updtArr.push({
      nm: nm,
      fnc: fnc,
    });
  }

  /**
   * アニメーションの削除
   * @param nm アニメーション名
   */
  rmv(nm) {
    for (let i = this.updtArr.length - 1; i >= 0; i--) {
      if (nm === this.updtArr[i].nm) {
        this.updtArr.splice(i, 1);
      }
    }
  }
};
