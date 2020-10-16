/**
 * 要素の設定
 */
const base = {
  storageKey: 'library-storage',
  systemList: document.getElementById('js-system-list'),
};


// apiの設定
const api = {
  baseUrl: 'http://api.calil.jp/library',
  appkey: '[key]',
  callback: 'getApi',
  apiUrl(systemid) {
    const url = `${this.baseUrl}?appkey=${this.appkey}&format=json&callback=${this.callback}&systemid=${systemid}`;
    console.log(url);
    return url;
  },
  getJsonpData(systemid) {
    const idStr = 'jsonpScript';
    const scriptEl = document.getElementById(idStr);
    if(scriptEl) {
      scriptEl.parentNode.removeChild(scriptEl);
    }
    const script = document.createElement('script');
    script.setAttribute('id', idStr);
    script.src = this.apiUrl(systemid);
    document.head.appendChild(script);
  }
}


/**
 * 状態の設定
 */
const state = {
};


/**
 * 共通の処理
 */
const CommonModel = {
  // ストレージの読み込み
  getStorage() {
    const getjson = localStorage.getItem(base.storageKey);
    const obj = JSON.parse(getjson);
    return obj;
  },
}


/**
 * MODEL
 */
class systemModel {
  constructor(data) {
    this.data = data;
    this.systemid = data[0].systemid;
    this.systemname = data[0].systemname;
  }
  getcodeFix(str) {
    const geocodeArr = str.split(',');
    console.log(geocodeArr);
    return `${geocodeArr[1]}, ${geocodeArr[0]}`;
  }
  systemHtml() {
    let libraryInfo = '';
    this.data.forEach(info => {
      libraryInfo += `
        <p><b>${info.formal}</b></p>
        <p>${info.post}<br>${info.address}<br><a href="https://www.google.com/maps/search/?api=1&query=${this.getcodeFix(info.geocode)}" target="_blank">Google Map</a></p>
        <p>${info.tel}</p>
        <hr>
      `;
    });

    const markup = `
      <div class="card mb-4">
        <div class="card-body">
          <h5>${this.systemname}</h5>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detail-modal--${this.systemid}">
            対象図書館を見る
          </button>
          <a href="library-delete.html?systemid=${this.systemid}" class="btn btn-primary">登録解除</a>
        </div>

        <div class="modal fade" id="detail-modal--${this.systemid}" tabindex="-1" role="dialog" aria-labelledby="detail-label--${this.systemid}" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="detail-label--${this.systemid}">${this.systemname}の対象図書館</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ${libraryInfo}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return markup;
  }
  showSystem() {
    const markup = this.systemHtml();
    base.systemList.insertAdjacentHTML('beforeend', markup);
  }
}


/**
 * VIEW
 */

// jsonpのcallback実行
function getApi(json) {
  if(json.length > 0) {
    console.log(json);
    new systemModel(json).showSystem();
    // json.forEach(item => {
    //   new systemModel(item).showSystem();
    // });
  } else {
    console.log('結果無し');
  }
}


/**
 * CONTROLLER
 */
function init() {
  const itemList = CommonModel.getStorage();
  itemList.forEach(data => {
    console.log(data);
    api.getJsonpData(data);
  });
}


/**
 * 実行
 */
init();
