// ■delayedモード
// 各path間で少し遅延がありますが、すべてのpathがほぼ同時に開始されます。
// new Vivus('canvas1', {
//   start: 'autostart',
//   type: 'delayed',
//   duration: 200
// });

// ■oneByOneモード
// 各pathが順番に描画されます。
// new Vivus('canvas1', {
//   start: 'autostart',
//   type: 'oneByOne',
//   duration: 300
// });

// ■asyncモード
// 線の長さが違っても線描画が同時に開始・終了されます。
// new Vivus('canvas2', {
//   start: 'autostart',
//   type: 'async',
//   duration: 300
// });

// ■scenarioモード
// data-startとdata-duration属性で各path要素の開始時間および継続時間を定義できます。
// new Vivus('canvas3', {
//   start: 'autostart',
//   type: 'scenario'
// });

// ■scenario-syncモード
// 3番目の線はdata-asyncプロパティがあるので、最後の線は3番目の線と同時に始まります。
// 4番目の線の継続時間は200msなので3番目の線よりも先に終了します。
// new Vivus('canvas4', {
//     start: 'autostart',
//     type: 'scenario-sync',
//     animTimingFunction: Vivus.EASE,
//     // animTimingFunction: Vivus.EASE_IN,
//     // pathTimingFunction: Vivus.EASE_OUT,
//   },
//   // コールバック関数（引数にアニメーションさせたインスタンスが入る）
//   function(svg){
//     console.log(svg);
//     // svg.reset();
//     svg.reset().play();
//   }
// );

// ■その他
const canvas5 = new Vivus('canvas5', {
    start: 'manual',
    type: 'delayed',
    duration: 200,
    delay: 100,
  },
  (svg) => {
    console.log(svg);
    svg.el.classList.add('is-animated');
  }
);
const playBtn = document.getElementById('play');
const reverseBtn = document.getElementById('reverse');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

playBtn.addEventListener('click', () => {
  canvas5.play();
});
reverseBtn.addEventListener('click', () => {
  canvas5.play(-1);
});
stopBtn.addEventListener('click', () => {
  canvas5.stop();
});
resetBtn.addEventListener('click', () => {
  canvas5.reset();
});
