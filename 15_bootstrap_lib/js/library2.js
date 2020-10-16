/**
 * 要素の設定
 */
const base = {
  cityList: document.getElementById('js-city-list'),
  prefList: document.getElementById('js-pref-list'),
};


// apiの設定
const api = {
  baseUrl: 'http://api.calil.jp/library',
  appkey: '[key]',
  callback: 'getApi',
  apiUrl(pref) {
    const url = `${this.baseUrl}?appkey=${this.appkey}&format=json&callback=${this.callback}&pref=${pref}`;
    console.log(url);
    return url;
  },
  getJsonpData(pref = '', city = '') {
    const idStr = 'jsonpScript';
    const scriptEl = document.getElementById(idStr);
    if(scriptEl) {
      scriptEl.parentNode.removeChild(scriptEl);
    }
    const script = document.createElement('script');
    script.setAttribute('id', idStr);
    script.src = this.apiUrl(pref, city);
    document.head.appendChild(script);
  }
}


// 東京の市区町村データ
const prefList = [
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
]


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


/**
 * 状態の設定
 */
const state = {
};


/**
 * MODEL
 */
class cityModel {
  constructor(data) {
    this.data = data;
  }
  cityHtml() {
    const markup = `
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-sm-8">
            <div class="card-body">
              <h5 class="card-title">${this.data.city}</h5>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card-body text-right">
              <a href="#" class="btn btn-primary">お気入り登録</a>
            </div>
          </div>
        </div>
      </div>
    `;
    return markup;
  }
  showCity() {
    const markup = this.cityHtml();
    base.cityList.insertAdjacentHTML('beforeend', markup);
  }
}


/**
 * VIEW
 */
const cityView = {
  clearList() {
    base.cityList.innerHTML = '';
  },
  showNoResult() {
    console.log('検索結果なし');
  },
  showPrefList() {
    prefList.forEach(pref => {
      const el = document.createElement('option');
      el.innerHTML = pref;
      el.setAttribute('value', pref);
      base.prefList.appendChild(el);
    });
  }
};

// jsonpのcallback実行
function getApi(json) {
  if(json.length > 0) {
    console.log(json);
    json.forEach(item => {
      new cityModel(item).showCity();
    });
  } else {
    cityView.showNoResult();
  }
}

/**
 * CONTROLLER
 */
function init() {
  // const param = getParams();
  // if(param.pref) {
  //   const pref = decodeURI(param.pref);
  //   const city = param.city == 'undefind' ? decodeURI(param.city) : '';
  //   api.getJsonpData(pref, city);
  // }

  cityView.showPrefList();

  base.prefList.addEventListener('change', e => {
    console.log(e.target.value);
    cityView.clearList();
    api.getJsonpData(e.target.value);
  });
}


/**
 * 実行
 */
init();
