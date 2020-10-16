/**
 * モジュールの読み込み
 */
import { AnimModel, AnimFunc } from "./anim.js";
import { DataModel } from "./getData.js";

/**
 * 要素の設定
 */
const base = {
  test: document.querySelector('.test'),
  test2: document.querySelector('.test2'),
  test3: document.querySelector('.test3'),
};


/**
 * 状態の設定
 */
const state = {
};


/**
 * MODEL
 */
// class AnimModel {
//   constructor(el) {
//     this.el = el;
//     // 各種デフォルト設定
//     this.defaultTime = 400;
//     this.customInDef = {
//       time: this.defaultTime,
//       ease: '',
//       scaleFrom: 1,
//       xFrom: 0,
//       yFrom: 0,
//       opacityFrom: 0,
//     };
//     this.customOutDef = {
//       time: this.defaultTime,
//       ease: '',
//       scaleTo: 1,
//       xTo: 0,
//       yTo: 0,
//       opacityTo: 0,
//     };
//   }
//   // 表示（フェード）
//   fadeIn(time = this.defaultTime) {
//     return new Promise((resolve) => {
//       this.el.style.opacity = 0;
//       this.el.style.transitionDuration = `${time}ms`;
//       this.el.style.transitionProperty = 'opacity';
//       if(this.el.style.display === 'none') {
//         this.el.style.display = null;
//       } else {
//         this.el.style.display = 'block';
//       }
//       setTimeout(() => {
//         this.el.style.opacity = 1;
//       }, 0);
//       setTimeout(() => {
//         this.el.style.transitionDuration = null;
//         this.el.style.transitionProperty = null;
//         this.el.style.opacity = null;
//         resolve();
//       }, time);
//     });
//   }
//   // 非表示（フェード）
//   fadeOut(time = this.defaultTime) {
//     return new Promise((resolve) => {
//       this.el.style.transitionDuration = `${time}ms`;
//       this.el.style.transitionProperty = 'opacity';
//       setTimeout(() => {
//         this.el.style.opacity = 0;
//       }, 0);
//       setTimeout(() => {
//         this.el.style.display = 'none';
//         this.el.style.transitionDuration = null;
//         this.el.style.transitionProperty = null;
//         this.el.style.opacity = null;
//         resolve();
//       }, time);
//     });
//   }
//   // 表示切替（フェード）
//   fadeToggle(time = this.defaultTime) {
//     if(this.el.style.display === 'none') {
//       return this.fadeIn(time);
//     } else {
//       return this.fadeOut(time);
//     }
//   }
//   // 表示（スライド）
//   slideDown(time = this.defaultTime) {
//     return new Promise((resolve) => {
//       this.el.style.transitionDuration = `${time}ms`;
//       this.el.style.transitionProperty = 'height';
//       this.el.style.height = 0;
//       this.el.style.overflow = 'hidden';
//       if(this.el.style.display === 'none') {
//         this.el.style.display = null;
//       } else {
//         this.el.style.display = 'block';
//       }
//       setTimeout(() => {
//         this.el.style.height = `${this.el.scrollHeight}px`;
//       }, 0);
//       setTimeout(() => {
//         this.el.style.transitionDuration = null;
//         this.el.style.transitionProperty = null;
//         this.el.style.height = null;
//         this.el.style.overflow = null;
//         resolve();
//       }, time);
//     });
//   }
//   // 非表示（スライド）
//   slideUp(time = this.defaultTime) {
//     return new Promise((resolve) => {
//       this.el.style.transitionDuration = `${time}ms`;
//       this.el.style.transitionProperty = 'height';
//       this.el.style.height = `${this.el.clientHeight}px`;
//       this.el.style.overflow = 'hidden';
//       setTimeout(() => {
//         this.el.style.height = 0;
//       }, 0);
//       setTimeout(() => {
//         this.el.style.display = 'none';
//         this.el.style.transitionDuration = null;
//         this.el.style.transitionProperty = null;
//         this.el.style.height = null;
//         this.el.style.overflow = null;
//         resolve();
//       }, time);
//     });
//   }
//   // 表示切替（スライド）
//   slideToggle(time = this.defaultTime) {
//     if(this.el.style.display === 'none') {
//       return this.slideDown(time);
//     } else {
//       return this.slideUp(time);
//     }
//   }
//   // 表示（カスタム）
//   customIn(time = this.defaultTime, customConf = {}) {
//     return new Promise((resolve) => {
//       // 1.カスタム設定の反映
//       const conf = {
//         ease: customConf.ease || this.customInDef.ease,
//         scaleFrom: customConf.scaleFrom || this.customInDef.scaleFrom,
//         xFrom: customConf.xFrom || this.customInDef.xFrom,
//         yFrom: customConf.yFrom || this.customInDef.yFrom,
//         opacityFrom: customConf.opacityFrom || this.customInDef.opacityFrom,
//       };
//       // 2.表示前のスタイルを設定
//       const transformProps = `
//         translate(${conf.xFrom}, ${conf.yFrom})
//         scale(${conf.scaleFrom})
//       `;
//       this.el.style.transform = transformProps;
//       this.el.style.opacity = conf.opacityFrom;
//       if(this.el.style.display === 'none') {
//         this.el.style.display = null;
//       } else {
//         this.el.style.display = 'block';
//       }
//       // 3.トランジションの設定
//       const transitionProps = `
//         transform ${time}ms ${conf.ease || ''},
//         opacity ${time}ms ${conf.ease || ''}
//       `;
//       this.el.style.transition = transitionProps;
//       // 4.表示する
//       setTimeout(() => {
//         this.el.style.transform = 'translate(0, 0) scale(1)';
//         this.el.style.opacity = 1;
//       }, 0);
//       // 5.変更用のプロパティを削除する
//       setTimeout(() => {
//         this.el.style.transition = null;
//         this.el.style.transform = null;
//         this.el.style.opacity = null;
//         resolve();
//       }, time);
//     });
//   }
//   // 非表示（カスタム）
//   customOut(time = this.defaultTime, customConf = {}) {
//     return new Promise((resolve) => {
//       // 1.カスタム設定の反映
//       const conf = {
//         ease: customConf.ease || this.customOutDef.ease,
//         scaleTo: customConf.scaleTo || this.customOutDef.scaleTo,
//         xTo: customConf.xTo || this.customOutDef.xTo,
//         yTo: customConf.yTo || this.customOutDef.yTo,
//         opacityTo: customConf.opacityTo || this.customOutDef.opacityTo,
//       };
//       // 2.トランジションの設定
//       const transitionProps = `
//         transform ${time}ms ${conf.ease || ''},
//         opacity ${time}ms ${conf.ease || ''}
//       `;
//       this.el.style.transition = transitionProps;
//       // 3.非表示にする
//       setTimeout(() => {
//         const transformProps = `
//           translate(${conf.xTo}, ${conf.yTo})
//           scale(${conf.scaleTo})
//         `;
//         this.el.style.transform = transformProps;
//         this.el.style.opacity = conf.opacityTo;
//       }, 0);
//       // 4.変更用のプロパティを削除する
//       setTimeout(() => {
//         this.el.style.display = 'none';
//         this.el.style.transition = null;
//         this.el.style.transform = null;
//         this.el.style.opacity = null;
//         resolve();
//       }, time);
//     });
//   }
//   // 表示切替（カスタム）
//   customToggle(time = this.defaultTime, customConf = {}) {
//     if(this.el.style.display === 'none') {
//       return this.customIn(time, customConf);
//     } else {
//       return this.customOut(time, customConf);
//     }
//   }
// }


// /**
//  * VIEW
//  */
// const AnimFunc = {
//   defaultTime: 400,
//   customInDef: {
//     time: this.defaultTime,
//     ease: '',
//     scaleFrom: 1,
//     xFrom: 0,
//     yFrom: 0,
//     opacityFrom: 0,
//   },
//   customOutDef: {
//     time: this.defaultTime,
//     ease: '',
//     scaleTo: 1,
//     xTo: 0,
//     yTo: 0,
//     opacityTo: 0,
//   },
//   // 表示（フェード）
//   fadeIn(el, time = this.defaultTime) {
//     return new Promise((resolve) => {
//       el.style.opacity = 0;
//       el.style.transitionDuration = `${time}ms`;
//       el.style.transitionProperty = 'opacity';
//       if(el.style.display === 'none') {
//         el.style.display = null;
//       } else {
//         el.style.display = 'block';
//       }
//       setTimeout(() => {
//         el.style.opacity = 1;
//       }, 0);
//       setTimeout(() => {
//         el.style.transitionDuration = null;
//         el.style.transitionProperty = null;
//         el.style.opacity = null;
//         resolve();
//       }, time);
//     });
//   },
//   // 非表示（フェード）
//   fadeOut(el, time = this.defaultTime) {
//     return new Promise((resolve) => {
//       el.style.transitionDuration = `${time}ms`;
//       el.style.transitionProperty = 'opacity';
//       setTimeout(() => {
//         el.style.opacity = 0;
//       }, 0);
//       setTimeout(() => {
//         el.style.display = 'none';
//         el.style.transitionDuration = null;
//         el.style.transitionProperty = null;
//         el.style.opacity = null;
//         resolve();
//       }, time);
//     });
//   },
//   // 表示切替（フェード）
//   fadeToggle(el, time = this.defaultTime) {
//     if(el.style.display === 'none') {
//       return this.fadeIn(el, time);
//     } else {
//       return this.fadeOut(el, time);
//     }
//   },
//   // 表示（スライド）
//   slideDown(el, time = this.defaultTime) {
//     return new Promise((resolve) => {
//       el.style.transitionDuration = `${time}ms`;
//       el.style.transitionProperty = 'height';
//       el.style.height = 0;
//       el.style.overflow = 'hidden';
//       if(el.style.display === 'none') {
//         el.style.display = null;
//       } else {
//         el.style.display = 'block';
//       }
//       setTimeout(() => {
//         el.style.height = `${el.scrollHeight}px`;
//       }, 0);
//       setTimeout(() => {
//         el.style.transitionDuration = null;
//         el.style.transitionProperty = null;
//         el.style.height = null;
//         el.style.overflow = null;
//         resolve();
//       }, time);
//     });
//   },
//   // 非表示（スライド）
//   slideUp(el, time = this.defaultTime) {
//     return new Promise((resolve) => {
//       el.style.transitionDuration = `${time}ms`;
//       el.style.transitionProperty = 'height';
//       el.style.height = `${el.clientHeight}px`;
//       el.style.overflow = 'hidden';
//       setTimeout(() => {
//         el.style.height = 0;
//       }, 0);
//       setTimeout(() => {
//         el.style.display = 'none';
//         el.style.transitionDuration = null;
//         el.style.transitionProperty = null;
//         el.style.height = null;
//         el.style.overflow = null;
//         resolve();
//       }, time);
//     });
//   },
//   // 表示切替（スライド）
//   slideToggle(el, time = this.defaultTime) {
//     if(el.style.display === 'none') {
//       return this.slideDown(el, time);
//     } else {
//       return this.slideUp(el, time);
//     }
//   },
//   // 表示（カスタム）
//   customIn(el, time = this.defaultTime, customConf = {}) {
//     return new Promise((resolve) => {
//       // 1.カスタム設定の反映
//       const conf = {
//         ease: customConf.ease || this.customInDef.ease,
//         scaleFrom: customConf.scaleFrom || this.customInDef.scaleFrom,
//         xFrom: customConf.xFrom || this.customInDef.xFrom,
//         yFrom: customConf.yFrom || this.customInDef.yFrom,
//         opacityFrom: customConf.opacityFrom || this.customInDef.opacityFrom,
//       };
//       // 2.表示前のスタイルを設定
//       const transformProps = `
//         translate(${conf.xFrom}, ${conf.yFrom})
//         scale(${conf.scaleFrom})
//       `;
//       el.style.transform = transformProps;
//       el.style.opacity = conf.opacityFrom;
//       if(el.style.display === 'none') {
//         el.style.display = null;
//       } else {
//         el.style.display = 'block';
//       }
//       // 3.トランジションの設定
//       const transitionProps = `
//         transform ${time}ms ${conf.ease || ''},
//         opacity ${time}ms ${conf.ease || ''}
//       `;
//       el.style.transition = transitionProps;
//       // 4.表示する
//       setTimeout(() => {
//         el.style.transform = 'translate(0, 0) scale(1)';
//         el.style.opacity = 1;
//       }, 0);
//       // 5.変更用のプロパティを削除する
//       setTimeout(() => {
//         el.style.transition = null;
//         el.style.transform = null;
//         el.style.opacity = null;
//         resolve();
//       }, time);
//     });
//   },
//   // 非表示（カスタム）
//   customOut(el, time = this.defaultTime, customConf = {}) {
//     return new Promise((resolve) => {
//       // 1.カスタム設定の反映
//       const conf = {
//         ease: customConf.ease || this.customOutDef.ease,
//         scaleTo: customConf.scaleTo || this.customOutDef.scaleTo,
//         xTo: customConf.xTo || this.customOutDef.xTo,
//         yTo: customConf.yTo || this.customOutDef.yTo,
//         opacityTo: customConf.opacityTo || this.customOutDef.opacityTo,
//       };
//       // 2.トランジションの設定
//       const transitionProps = `
//         transform ${time}ms ${conf.ease || ''},
//         opacity ${time}ms ${conf.ease || ''}
//       `;
//       el.style.transition = transitionProps;
//       // 3.非表示にする
//       setTimeout(() => {
//         const transformProps = `
//           translate(${conf.xTo}, ${conf.yTo})
//           scale(${conf.scaleTo})
//         `;
//         el.style.transform = transformProps;
//         el.style.opacity = conf.opacityTo;
//       }, 0);
//       // 4.変更用のプロパティを削除する
//       setTimeout(() => {
//         el.style.display = 'none';
//         el.style.transition = null;
//         el.style.transform = null;
//         el.style.opacity = null;
//         resolve();
//       }, time);
//     });
//   },
//   // 表示切替（カスタム）
//   customToggle(el, time = this.defaultTime, customConf = {}) {
//     if(el.style.display === 'none') {
//       return this.customIn(el, time, customConf);
//     } else {
//       return this.customOut(el, time, customConf);
//     }
//   }
// }


/**
 * CONTROLLER
 */
function init() {
  // const test = new AnimModel(base.test3);
  // console.log(test);
  const data = {
    test: 'test',
    word: 'word2'
  };
  // DataModel.setStorage(data);
  // console.log(DataModel.getStorage());
  // DataModel.clearStorage();
  // DataModel.setCookie(data);
  // console.log(DataModel.getCookie());
  // DataModel.clearCookie(data);
  // console.log(DataModel.getParams());

  setTimeout(() => {
    // AnimFunc.test();
    // AnimFunc.customToggle(base.test3, 2000)
    //   .then(() => {
    //     return AnimFunc.customToggle(base.test3, 2000)
    //   })
    //   .then(() => {
    //     return AnimFunc.customToggle(base.test3, 2000)
    //   })
    //   .then(() => {
    //     return AnimFunc.customToggle(base.test3, 2000)
    //   })
    //   .then(() => {
    //     return AnimFunc.customToggle(base.test3, 2000)
    //   })
      // .then(() => {
      //   return AnimFunc.fadeToggle(base.test3, 1000);
      // })
      // .then(() => {
      //   return AnimFunc.fadeToggle(base.test3, 1000);
      // })
      // .then(() => {
      //   return AnimFunc.fadeToggle(base.test3, 1000);
      // })
      // .then(() => {
      //   return AnimFunc.fadeToggle(base.test3, 1000);
      // })




    // test.customToggle(1000)
    // .then(() => {
    //   return test.customToggle(1000)
    // })
    // .then(() => {
    //   return test.customToggle(1000)
    // })
    // .then(() => {
    //   return test.customToggle(1000)
    // })
    // .then(() => {
    //   return test.customToggle(1000)
    // })
    // .then(() => {
    //   return test.customToggle(1000)
    // })
    // .then(() => {
    //   return test.customToggle(1000)
    // })

    // test.slideUp(1000)
    //   .then(() => {
    //     return test.slideToggle(1000);
    //   })
    //   .then(() => {
    //     return test.slideToggle(1000);
    //   })
    //   .then(() => {
    //     return test.slideToggle(1000);
    //   })
    //   .then(() => {
    //     return test.slideToggle(1000);
    //   })
    //   .then(() => {
    //     return test.slideToggle(1000);
    //   })
    // test.fadeOut(1000, () => {
    //   console.log('callback');
    //   test.fadeIn();
    // });
    // test.fadeOut(1000)
    //   .then(() => {
    //     // return test2.fadeOut(1000);
    //     return test.fadeIn(2000);
    //   })
    //   .then(() => {
    //     console.log('test');
    //   });

    // test.fadeToggle(2000)
    //   .then(() => {
    //     return test.fadeToggle(2000);
    //   })
    //   .then(() => {
    //     return test.fadeToggle(2000);
    //   })
    //   .then(() => {
    //     return test.fadeToggle(2000);
    //   })
    //   .then(() => {
    //     return test.fadeToggle(2000);
    //   })

  }, 1000);
}


/**
 * 実行
 */
init();
