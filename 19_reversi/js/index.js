'use strict';

import { GameCanvas } from "./module/game.canvas.js";
import { GameCore } from "./module/game.core.js";

const game = {
  core: new GameCore(),
  canvas: new GameCanvas(),
};

// 201 init canvas
(() => {
  // 縦横比固定でキャンバス作成
  const id = 'reversi';
  const sz = game.core.getFitSz(10, 11);
  const c = game.canvas.initCnvs(id, sz.w, sz.h);
  // 全面色塗り
  c.cntx.fillStyle = "#faa";
  c.cntx.fillRect(0, 0, c.w, c.h);
})();
