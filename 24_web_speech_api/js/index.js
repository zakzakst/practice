'use strict';

class Speech {
  constructor(btnId, resultId) {
    this.btn = document.getElementById(btnId);
    this.result = document.getElementById(resultId);
    this.active = false;
    this.speech = new webkitSpeechRecognition();
    this.speech.lang = 'ja-JP';
  }
  init() {
    this.speechHandler();
    this.btnHandler();
  }
  btnHandler() {
    this.btn.addEventListener('click', () => {
      console.log('ボタンクリック');
      if(!this.active) {
        console.log('音声認識開始');
        this.active = true;
        this.speech.start();
        this.btn.textContent = '停止';
      } else {
        console.log('音声認識停止');
        this.active = false;
        this.speech.stop();
        this.btn.textContent = '開始';
      }
    });
  }
  speechHandler() {
    this.speech.onresult = e => {
      if (e.results[0].isFinal) {
        const text = e.results[0][0].transcript;
        this.result.innerHTML += `${text}<br>`;
      }
    }
    this.speech.onend = () => {
      if (this.active) {
        this.speech.start();
      }
    }
  }
}

(() => {
  const speech = new Speech('test', 'result');
  speech.init();
})();
