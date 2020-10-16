/**
 * 要素の設定
 */
const base = {
  el: {
    phoneBtn: document.getElementById('phone-btn'),
    phoneText: document.getElementById('phone-btn__text'),
    mainText: document.getElementById('main__text'),
    pageLinks: document.getElementById('page-links'),
  }
};


/**
 * 状態の設定
 */
const state = {
};

const data = {
  phoneNumber: '00-0000-0000',
  mainText: 'ユーザーが最初に目にする画面。\nパッと見て「ぼんやりとでもいいので何についてのページか」が伝わることを一番の目的にする。\nキャッチフレーズなどを載せることもある。\nユーザーが一番欲しがっている情報（※イベントページなら日付など）を載せる場合もある。',
  pageLinks: [
    {text: 'Section01', anchor: 'section1'},
    {text: 'Section02', anchor: 'section2'},
    {text: 'Section03', anchor: 'section3'},
    {text: 'Section04', anchor: 'section4'},
    {text: 'Section05', anchor: 'section5'},
  ],
}

/**
 * MODEL
 */


/**
 * VIEW
 */
const common = {
  n2br(text) {
    const brText = text.replace(/\n/g, '<br>');
    return brText;
  }
};

const indexView = {
  init() {
    this.showPhoneBtn();
    this.showMainText();
    this.showPageLinks();
  },
  showPhoneBtn() {
    const btnEl = base.el.phoneBtn;
    btnEl.setAttribute('href', `tel:${data.phoneNumber}`);
    const textEl = base.el.phoneText;
    textEl.textContent = data.phoneNumber;
  },
  showMainText() {
    const textEl = base.el.mainText;
    textEl.innerHTML = common.n2br(data.mainText);
  },
  showPageLinks() {
    const linksEl = base.el.pageLinks;
    const list = data.pageLinks;
    let markup = '';
    for(let i = 0; i < list.length; i++) {
      markup += `<li><a href="#${list[i].anchor}">${list[i].text}</a></li>`;
    }
    linksEl.innerHTML = markup;
  }
};


/**
 * CONTROLLER
 */
function init() {
  indexView.init();
  // indexView.showMainText();
  // common.n2br(data.mainText);
}


/**
 * 実行
 */
init();
