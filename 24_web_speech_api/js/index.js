'use strict';

class SpeechRecognition {
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

class SpeechSynthesis {
  constructor(btnId, targetId) {
    this.btn = document.getElementById(btnId);
    this.target = document.getElementById(targetId);
    this.synthesis = new SpeechSynthesisUtterance();
    this.synthesis.text = ''; // 文章
    this.synthesis.lang = 'ja-JP'; // 言語
    this.synthesis.rate = 2.5; // 速度 0.1-10 初期値:1（倍速なら2, 半分の倍速なら0.5）
    this.synthesis.pitch = 1.5; // 高さ 0-2 初期値:1
    this.synthesis.volume = .5; // 音量 0-1 初期値:1
  }
  init() {
    this.btnHandler();
  }
  btnHandler() {
    this.btn.addEventListener('click', () => {
      this.synthesis.text = this.target.innerText;
      speechSynthesis.speak(this.synthesis);
    });
  }
}

(() => {
  const recognition = new SpeechRecognition('test', 'result');
  recognition.init();
  const synthesis = new SpeechSynthesis('test2', 'result');
  synthesis.init();
})();
