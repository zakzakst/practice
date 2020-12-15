'use strict';

export class GameCanvas {
  constructor() {
    this.scl = 1;
  }

  /**
   * キャンバスの作成
   * @param w 横比率
   * @param h 縦比率
   * @param scl デバイスの解像度
   * @return 作成したキャンパスとデータのオブジェクト
   */
  genCnvs(w, h, scl) {
    if (scl === undefined) { scl = 1; }
    const $cnvs = $('<canvas>')
      .attr('width', w * scl)
      .attr('height', h * scl)
      .width(w)
      .height(h);
    const cnvs = $cnvs[0];
    const cntx = cnvs.getContext('2d');
    return {
      $cnvs,
      cnvs,
      cntx,
      w: w * scl,
      h: h * scl,
    };
  }

  /**
   * 指定ID内に、指定比率でキャンバスを作成して格納
   * @param id HTML要素ID
   * @param w 横比率
   * @param h 縦比率
   * @param scl デバイスの解像度
   * @return 作成したキャンパスとデータのオブジェクト
   */
  initCnvs(id, w, h, scl) {
    this.scl = scl;
    const c = this.genCnvs(w, h, scl);
    $(`#${id}`).empty().append(c.$cnvs);
    return c;
  }
};
