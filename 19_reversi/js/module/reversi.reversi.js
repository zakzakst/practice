'use strict';

export class ReversiReversi {
  constructor() {
    this.w = this.h = 8;
  }

  /**
   * 盤面走査
   */
  scnBrd(fnc) {
    const w = this.w;
    const h = this.h;
    const max = w * h;
    for (let i = 0; i < max; i++) {
      const x = i % w;
      const y = (i / w) | 0;
      fnc(i, x, y);
    }
  }
}
