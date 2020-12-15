'use strict';

import { GameCanvas } from "./game.canvas.js";

const game = {
  canvas: new GameCanvas(),
};

export class ResourceFont {
  /**
   * フォントの読み込み
   * @param f1 デバイスフォント
   * @param f2 Webフォント
   * @return Webフォントロード完了メッセージを返すpromiseオブジェクト
   */
  load(f1, f2) {
    console.log(game.canvas);
    const d = $.Deferred();
    const c = game.canvas.genCnvs(1, 1);
    let tryCnt = 0;
    let tryMax = 30;
    const chckTxt = 'abcdefg';
    const fntNm = f1.length > f2.length ? f1 : f2;

    $('body').append(c.$cnvs);

    // フォント取得チェックの再起関数
    const fnc = () => {
      // 試行回数の最大値に達したら処理を終了してエラーメッセージを返す
      if (tryCnt++ >= tryMax) {
        const msg = `err fnt : ${fntNm}`;
        console.log(msg);
        d.resolve(msg);
        return;
      }

      // デバイスフォントとWebフォントそれぞれを設定した時のテキストの幅を取得
      c.cntx.font = `32px ${f1}`;
      const mt1 = c.cntx.measureText(chckTxt).width;
      c.cntx.font = `32px ${f2}`;
      const mt2 = c.cntx.measureText(chckTxt).width;
      console.log('fnt compare', mt1, mt2);

      // テキストの幅を比較し、差があればWebフォントが読み込まれたと判断し、Webフォントロード完了メッセージを返す
      if (mt1 !== mt2) {
        const msg = `load fnt : ${fntNm}`;
        console.log(msg);
        d.resolve(msg);
        c.$cnvs.remove();
        return;
      }

      // まだ読み込まれていない場合は関数を再度実行
      setTimeout(fnc, 100);
    };

    // 再起関数の実行
    fnc();

    return d.promise();
  }
}
