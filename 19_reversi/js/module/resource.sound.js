'use strict';

import { GameCore } from "./game.core.js";

const game = {
  core: new GameCore(),
};

export class ResourceSound {
  constructor() {
    this.canUse = null;
    this.canOgg = false;
    this.canMp3 = false;
    this.ext = '';
    this.timeout = 3000;
    this.snds = {};
    this.seMax = 8;
    this.bgmNow = null;
    // this.Sound = () => {
    //   this.audio = null;
    //   this.seNow = 0;
    // };
  }

  Sound() {
    return {
      audio: null,
      seNow: 0,
    };
  }

  /**
   * 初期化
   */
  init() {
    if (this.canUse !== null) return;
    // Audioが有効か否か
    try {
      const audio = new Audio('');
      this.canOgg = audio.canPlayType('audio/ogg') === 'maybe';
      this.canMp3 = audio.canPlayType('audio/mpeg') === 'maybe';
    } catch(e) {}
    // 音声使用可能
    this.canUse = this.canOgg || this.canMp3;
    // 拡張子
    this.ext = this.canOgg ? '.ogg' : (this.canMp3 ? '.mp3' : '');
    // モバイル時は不能
    if (!game.core.ua.pc) {
      this.canUse = false;
    }
  }

  /**
   * 音声の読み込み
   * @param nm 音声名
   * @param url 音声ファイルURL
   * @param type 種類
   * @return 音声ファイルロード完了メッセージを返すpromiseオブジェクト
   */
  load(nm, url, type) {
    const d = $.Deferred();
    this.init();
    // 使用不能の場合
    if (this.canUse === false) {
      const msg = `cannot use snd : ${nm}`;
      console.log(msg);
      d.resolve(msg);
      return d.promise();
    }
    // 使用可能の場合
    if (type !== 'se') {
      // タイムアウト時の処理
      const id = setTimeout(() => {
        this.snds[nm].audio = undefined;
        const msg = `timeout snd : ${nm}`;
        console.log(msg);
        d.resolve(msg);
      }, this.timeout);
      // this.snds[nm] = new this.Sound();
      this.snds[nm] = this.Sound();
      this.snds[nm].audio = new Audio('');
      this.snds[nm].audio.preload = 'auto';
      this.snds[nm].audio.src = `${url}${this.ext}`;
      // プレロード準備完了時の処理
      $(this.snds[nm].audio).one('canplaythrough error', e => {
        let msg;
        if (e.type === 'error') {
          this.snds[nm].audio = undefined;
          // const msg = `err snd : ${nm}`;
          msg = `err snd : ${nm}`;
        } else {
          // const msg = `load snd : ${nm}`;
          msg = `load snd : ${nm}`;
        }
        console.log(msg);
        d.resolve(msg);
        clearTimeout(id);
      });
    } else {
      // SEの場合は複数読み込み
      // this.snds[nm] = new this.Sound();
      this.snds[nm] = this.Sound();
      const arr = [];
      for (let i = 0; i < this.seMax; i++) {
        arr.push(this.load(`${nm}-${i}`, url));
      }
      $.when.apply($, arr).done(() => {
        d.resolve();
      });
    }
    return d.promise();
  }

  /**
   * 無効確認
   * @param nm 音声名
   */
  chckUnbl(nm) {
    if (this.canUse === false) return;
    if (this.snds[nm] === undefined) return;
    return false;
  }

  /**
   * 再生位置を0に
   * @param au オーディオ
   * @param cmd 実行処理名
   */
  rstCurTm(au, cmd) {
    // 命令実行
    if (cmd) {
      au[cmd]();
    }
    // 再生位置を0に
    au.currentTime = 0;
    // currentTimeが利かない場合は読み込み直す
    if (au.currentTime !== 0) {
      au.load();
    }
  }

  /**
   * 再生
   * @param nm 音声名
   * @param cb コールバック
   */
  play(nm, cb) {
    if (this.chckUnbl(nm)) return;
    const au = this.snds[nm].audio;
    // 巻き戻っていないなら再生位置を0に
    if (au.currentTime >= au.duration) {
      this.rstCurTm(au, 'pause');
    }
    // ループなし
    if (typeof au.loop === 'boolean') {
      au.loop = false;
    }
    // コールバックの設定
    $(au).off('ended');
    if (typeof cb === 'function') {
      $(au).on('ended', cb);
    }
    // 再生
    au.play();
  }

  /**
   * ループ再生
   * @param nm 音声名
   */
  playLoop(nm) {
    if (this.chckUnbl(nm)) return;
    const au = this.snds[nm].audio;
    // 巻き戻っていないなら再生位置を0に
    if (au.currentTime >= au.duration) {
      this.rstCurTm(au, 'pause');
    }
    // ループあり
    if (typeof au.loop === 'boolean') {
      au.loop = true;
    } else {
      $(au).off('ended');
      $(au).on('ended', () => {
        this.rstCurTm(au, 'play');
      });
    }
    // 再生
    au.play();
  }

  /**
   * 一時停止
   * @param nm 音声名
   */
  pause(nm) {
    if (this.chckUnbl(nm)) return;
    // 一時停止
    this.snds[nm].audio.pause();
  }

  /**
   * 停止
   * @param nm 音声名
   */
  stop(nm) {
    if (this.chckUnbl(nm)) return;
    // console.log(this.snds);
    const au = this.snds[nm].audio;
    $(au).off('ended');
    this.rstCurTm(au, 'pause');
  }

  /**
   * ボリューム変更
   * @param nm 音声名
   * @param vol ボリューム
   */
  vol(nm, vol) {
    if (this.chckUnbl(nm)) return;
    this.snds[nm].audio.volume = vol;
  }

  /**
   * SE再生
   * @param nm 音声名
   */
  playSE(nm) {
    if (this.chckUnbl(nm)) return;
    const snd = this.snds[nm];
    this.play(`${nm}-${snd.seNow}`);
    snd.seNow = (snd.seNow + 1) % this.seMax;
  }

  /**
   * BGM再生
   * @param nm 音声名
   * @param cb コールバック
   */
  playBGM(nm, cb) {
    if (this.chckUnbl(nm)) return;
    if (nm !== this.bgmNow && this.bgmNow) {
      this.stop(this.bgmNow);
    }
    this.bgmNow = nm;
    if (cb) {
      this.play(nm, cb);
    } else {
      this.playLoop(nm);
    }
  }
}
