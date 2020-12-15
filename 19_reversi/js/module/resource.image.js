'use strict';

export class ResourceImage {
  constructor() {
    this.imgs = {};
  }

  /**
   * 画像の読み込み
   * @param nm 画像名
   * @param url 画像URL
   * @return 画像ロード完了メッセージを返すpromiseオブジェクト
   */
  load(nm, url) {
    const d = $.Deferred();
    const img = this.imgs[nm] = new Image();
    img.onload = () => {
      const msg = `load img : ${nm}`;
      console.log(msg);
      d.resolve(msg);
    };
    img.src = url;
    return d.promise();
  }
}
