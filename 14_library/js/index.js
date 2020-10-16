// apiの設定
const api = {
  lib: {
    baseUrl: 'http://api.calil.jp/library',
    appkey: '[key]',
    callback: 'getApi',
    // limit: 100,
    url(type, pref = '') {
      const paramPref = pref ? `&pref=${pref}` : '';
      const paramLimit = this.limit ? `&limit=${this.limit}` : '';
      let paramFormat = '';
      switch (type) {
        case 'xml':
          paramFormat = '&format=xml';
          break;
        case 'json':
          paramFormat = '&format=json&callback=';
          break;
        case 'jsonp':
          paramFormat = `&format=json&callback=${this.callback}`;
          break;
        default:
          break;
      }
      console.log(`${this.baseUrl}?appkey=${this.appkey + paramPref + paramLimit + paramFormat}`);
      return `${this.baseUrl}?appkey=${this.appkey + paramPref + paramLimit + paramFormat}`;
    },
    // jsonUrl(pref) {
    //   if(this.limit) {
    //     return `${this.baseUrl}?appkey=${this.appkey}&pref=${pref}&limit=${this.limit}&format=json&callback=`;
    //   } else {
    //     return `${this.baseUrl}?appkey=${this.appkey}&pref=${pref}&format=json&callback=`;
    //   }
    // },
    // jsonpUrl(pref) {
    //   if(this.limit) {
    //     return `${this.baseUrl}?appkey=${this.appkey}&pref=${pref}&limit=${this.limit}&format=json&callback=${this.callback}`;
    //   } else {
    //     return `${this.baseUrl}?appkey=${this.appkey}&pref=${pref}&format=json&callback=${this.callback}`;
    //   }
    // },
  },
  book: {
    baseUrl: 'http://api.calil.jp/check',
    appkey: '[key]',
    callback: 'getApi',
    xmlUrl(isbn, systemid) {
      return `${this.baseUrl}?appkey=${this.appkey}&isbn=${isbn}&systemid=${systemid}&format=xml`;
    },
    jsonUrl(isbn, systemid) {
      return `${this.baseUrl}?appkey=${this.appkey}&isbn=${isbn}&systemid=${systemid}&format=json&callback=no`;
    },
    jsonpUrl(isbn, systemid) {
      return `${this.baseUrl}?appkey=${this.appkey}&isbn=${isbn}&systemid=${systemid}&format=json&callback=${this.callback}`;
    },
  }
};

const base = {
  libList: document.getElementById('lib-list'),
  prefList: document.getElementById('pref-list'),
  error: document.getElementById('error'),
  prefItems: [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
    '鳥取県',
    '島根県',
    '岡山県',
    '広島県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県',
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県',
  ],
};

// 状態
const state = {
  pref: '',
};

// URLパラメータの取得
function getParams() {
  let paramsObj = {};
  const params = location.search.substring(1).split('&');
  if(params[0] !== '') {
    params.forEach(param => {
      const kv = param.split('=');
      paramsObj[kv[0]] = kv[1];
    });
    return paramsObj;
  } else {
    return '';
  }
}

// XMLデータの取得
function getXmlData(url) {
  let data = new Promise((resolve) => {
    fetch(url)
      .then((res) => {
        return res.text();
      })
      .then((xmlText) => {
        const parser = new DOMParser();
        const document = parser.parseFromString(xmlText, "text/xml");
        resolve(document)
      })
      .catch(error => {
        console.log(error);
      });
  });
  return data
}

// JSONデータの取得
function getJsonData(url) {
  let data = new Promise((resolve) => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data)
      })
      .catch(error => {
        console.log(error);
      });
  });
  return data
}

// JSONPデータの取得
function getJsonpData(url) {
  const idStr = 'jsonpScript';
  const scriptEl = document.getElementById(idStr);
  if(scriptEl) {
    scriptEl.parentNode.removeChild(scriptEl);
  }
  const script = document.createElement('script');
  script.setAttribute('id', idStr);
  script.src = url;
  document.head.appendChild(script);
}

// 選択都道府県の設定
function setPref(pref) {
  state.pref = pref;
}

// View
const indexView = {
  showLib(data) {
    // 図書館一覧の表示
    const ulEl = document.createElement('ul');
    data.forEach(lib => {
      const liEl = document.createElement('li');
      liEl.textContent = lib.formal;
      ulEl.appendChild(liEl);
    });
    const pEl = document.createElement('h1');
    pEl.textContent = `${state.pref}の図書館一覧（${data.length}）`;
    base.libList.appendChild(pEl);
    base.libList.appendChild(ulEl);
  },
  showPref() {
    // 都道府県一覧の表示
    const ulEl = document.createElement('ul');
    base.prefItems.forEach(item => {
      const liEl = document.createElement('li');
      const aEl = document.createElement('a');
      aEl.setAttribute('href', `?pref=${item}`);
      aEl.textContent = item;
      liEl.appendChild(aEl);
      ulEl.appendChild(liEl);
    });
    base.prefList.appendChild(ulEl);
  },
  showError(message) {
    // エラーの表示
    base.error.textContent = message;
  }
}

// 読み込み後の処理を記載
// 関数名は「api設定」の「callback」と合わせる
function getApi(json) {
  if(json.length) {
    // 取得できた情報があった場合、その都市の図書館一覧を表示
    console.log(json);
    indexView.showLib(json);
  } else {
    // 取得できた情報がない場合、エラーメッセージと都道府県一覧を表示
    console.log('エラーメッセージ・都道府県の選択');
    indexView.showError('情報を取得できませんでした。再度ページを読み込むか、下記のリンクから都道府県を指定してください。');
    indexView.showPref();
  }
}

// 初期化
function init() {

  if(getParams() && getParams().pref) {
    // URLに都道府県パラメータがあれば指定された都道府県の情報を取得を実行
    setPref(decodeURI(getParams().pref));
    getJsonpData(api.lib.url('jsonp', state.pref));
  } else {
    // なければ都道府県一覧を表示
    console.log('都道府県の選択');
    indexView.showPref();
  }

  // const button = document.getElementById('test');
  // button.addEventListener('click', () => {
  //   getJsonpData(api.lib.url('jsonp', state.pref));
  // });
}

/**
 * 実行
 */
init();
