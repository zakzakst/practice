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

  /**
   * 範囲内か判定
   * @param cX クリックx位置
   * @param cY クリックy位置
   * @param x 範囲左上x位置
   * @param y 範囲左上y位置
   * @param w 範囲幅
   * @param h 範囲高さ
   */
  inRng(cX, cY, x, y, w, h) {
    if (cX < x || x + w <= cX) return false;
    if (cY < y || y + h <= cY) return false;
    return true;
  }
};
