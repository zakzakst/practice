'use strict';

export class GameCore {
  constructor() {
    this.ua = {};
    this.ua.pc = ! window.navigator.userAgent.match(/iphone|ipod|ipad|android|windows Phone/i);
  }

  /**
   * ウィンドウサイズ横幅を取得
   * @return 横幅
   */
  getWinW() {
    return window.innerWidth;
  }

  /**
   * ウィンドウサイズ高さを取得
   * @return 高さ
   */
  getWinH() {
    return window.innerHeight;
  }

  /**
   * ウィンドウサイズを元に、指定横縦比が入る縦横サイズを取得
   */
  getFitSz(w, h) {
    const winW = this.getWinW();
    const winH = this.getWinH();
    let resW, resH;
    if (w / h >= winW / winH) {
      resW = winW;
      resH = (h * winW / w) | 0;
    } else {
      resW = (w * winH / h) | 0;
      resH = winH;
    }
    return {w: resW, h: resH};
  }
};
