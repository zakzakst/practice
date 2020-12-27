'use strict';

class Sound {
  constructor(src, loop) {
    this.src = src;
    this.audio = new Audio(this.src);
    this.loop = loop;
    this.loaded = false;
    this.playing = false;
  }
  init() {
    this.audio.load();
    this.loopHandler();
    this.loadHandler();
  }
  play() {
    // 未ロード／再生中の場合は処理を中止
    if (!this.loaded || this.playing) return;
    this.playing = true;
    this.audio.play();
  }
  volume(type) {
    if (type === 'up') {
      if (0.9 < this.audio.volume) {
        this.audio.volume = 1;
      } else {
        this.audio.volume += 0.1;
      }
    } else if (type === 'down') {
      if (this.audio.volume < 0.1) {
        this.audio.volume = 0;
      }
      else {
        this.audio.volume -= 0.1;
      }
    }
  }
  loadHandler() {
    this.audio.addEventListener('loadeddata', () => {
      this.loaded = true;
      // BGMの自動再生はしない
      // if (this.loop) {
      //   this.audio.play();
      // }
    });
  }
  loopHandler() {
    if (this.loop) {
      // ループ設定が true の場合は再生完了後に再度再生
      this.audio.addEventListener('ended', () => {
        this.audio.currentTime = 0;
        this.audio.play();
      });
    } else {
      // ループ設定が false の場合は再生中フラグを変更
      this.audio.addEventListener('ended', () => {
        this.audio.currentTime = 0;
        this.playing = false;
      });
    }
  }
}

(() => {
  // 音声の設定
  const soundBgm = new Sound('/audio/bgm.mp3', true);
  const sound1 = new Sound('/audio/se1.mp3', false);
  const sound2 = new Sound('/audio/se2.mp3', false);
  const sound3 = new Sound('/audio/se3.mp3', false);
  // ボタン要素の設定
  const btnBgmUpEl = document.getElementById('bgmUp');
  const btnBgmDownEl = document.getElementById('bgmDown');
  const btn1El = document.getElementById('se1');
  const btn2El = document.getElementById('se2');
  const btn3El = document.getElementById('se3');
  // BGMの再生設定
  soundBgm.init();
  btnBgmUpEl.addEventListener('click', () => {
    soundBgm.volume('up');
  });
  btnBgmDownEl.addEventListener('click', () => {
    soundBgm.volume('down');
  });
  // 効果音の再生設定
  sound1.init();
  btn1El.addEventListener('click', () => {
    sound1.play();
  });
  sound2.init();
  btn2El.addEventListener('click', () => {
    sound2.play();
  });
  sound3.init();
  btn3El.addEventListener('click', () => {
    sound3.play();
  });
  // ユーザーに確認後、BGM再生
  setTimeout(() => {
    const confirmMessage = '音声を再生しますか？';
    const confirm = window.confirm(confirmMessage);
    if (confirm) {
      soundBgm.play();
    }
  }, 2000);
})();
