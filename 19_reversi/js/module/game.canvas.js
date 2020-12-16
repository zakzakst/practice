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

  /**
   * サイズ変更画像の取得
   * @return 変更後のキャンバス
   */
  getScaledImg(img, sx, sy, sw, sh, dw, dh) {
    const rtX = dw / sw;
    const rtY = dh / sh;
    if (rtX >= 0.5 && rtY >= 0.5) {
      // 50%以上
      const c = this.genCnvs(dw, dh);
      c.cntx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
      return c.cnvs;
    } else {
      // 50%未満
      const w2 = (rtX < 0.5) ? Math.ceil(sw * 0.5) : dw;
      const h2 = (rtY < 0.5) ? Math.ceil(sh * 0.5) : dh;
      const c = this.genCnvs(w2, h2);
      c.cntx.drawImage(img, sx, sy, sw, sh, 0, 0, w2, h2);
      const newImg = this.getScaledImg(c.cnvs, 0, 0, w2, h2, dw, dh);
      return newImg;
    }
  }
};
