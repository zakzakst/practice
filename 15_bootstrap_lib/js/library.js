/**
 * 要素の設定
 */
const base = {
  libraryList: document.getElementById('js-library-list'),
  cityList: document.getElementById('js-city-list'),
};


// apiの設定
const api = {
  baseUrl: 'http://api.calil.jp/library',
  appkey: '[key]',
  callback: 'getApi',
  apiUrl(pref = '', city = '') {
    const url = `${this.baseUrl}?appkey=${this.appkey}&format=json&callback=${this.callback}&pref=${pref}&city=${city}`;
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
const cityList = [
  'あきる野市',
  '稲城市',
  '羽村市',
  '葛飾区',
  '江戸川区',
  '江東区',
  '港区',
  '荒川区',
  '国分寺市',
  '国立市',
  '狛江市',
  '三鷹市',
  '渋谷区',
  '小金井市',
  '小平市',
  '昭島市',
  '新宿区',
  '新島村',
  '杉並区',
  '世田谷区',
  '清瀬市',
  '西多摩郡奥多摩町',
  '西多摩郡瑞穂町',
  '西多摩郡日の出町',
  '西東京市',
  '青梅市',
  '千代田区',
  '足立区',
  '多摩市',
  '台東区',
  '大田区',
  '中央区',
  '中野区',
  '町田市',
  '調布市',
  '東久留米市',
  '東村山市',
  '東大和市',
  '日野市',
  '八王子市',
  '八丈島八丈町',
  '板橋区',
  '品川区',
  '府中市',
  '武蔵村山市',
  '武蔵野市',
  '福生市',
  '文京区',
  '豊島区',
  '北区',
  '墨田区',
  '目黒区',
  '立川市',
  '練馬区',
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
class libraryModel {
  constructor(data) {
    this.data = data;
  }
  libHtml() {
    const markup = `
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-sm-8">
            <div class="card-body">
              <h5 class="card-title">${this.data.formal}</h5>
              <div>
              <button class="btn btn-secondary btn-sm" type="button" data-toggle="collapse" data-target="#lib-${this.data.libid}" aria-expanded="false" aria-controls="lib-${this.data.libid}">
                詳細を見る
              </button>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card-body text-right">
              <a href="library-register.html?systemid=${this.data.systemid}" class="btn btn-primary">お気入り登録</a>
            </div>
          </div>
        </div>
        <div class="collapse" id="lib-${this.data.libid}">
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">住所</th>
                  <td>${this.data.post}<br>${this.data.address}</td>
                </tr>
                <tr>
                  <th scope="row">電話</th>
                  <td>${this.data.tel}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
    return markup;
  }
  showLibrary() {
    const markup = this.libHtml();
    base.libraryList.insertAdjacentHTML('beforeend', markup);
  }
}


/**
 * VIEW
 */
const libraryView = {
  clearList() {
    base.libraryList.innerHTML = '';
  },
  showNoResult() {
    console.log('検索結果なし');
  },
  showCityList() {
    cityList.forEach(city => {
      const el = document.createElement('option');
      el.innerHTML = city;
      el.setAttribute('value', city);
      base.cityList.appendChild(el);
    });
  }
};

// jsonpのcallback実行
function getApi(json) {
  if(json.length > 0) {
    console.log(json);
    json.forEach(item => {
      new libraryModel(item).showLibrary();
    });
  } else {
    libraryView.showNoResult();
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

  libraryView.showCityList();

  base.cityList.addEventListener('change', e => {
    console.log(e.target.value);
    libraryView.clearList();
    api.getJsonpData('東京', e.target.value);
  });
}


/**
 * 実行
 */
init();
