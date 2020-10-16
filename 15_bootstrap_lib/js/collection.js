/**
 * 要素の設定
 */
const base = {
  bookStorageKey: 'storage',
  libraryStorageKey: 'library-storage',
  collectionList: document.getElementById('js-collection-list'),
};


// apiの設定
const api = {
  baseUrl: 'http://api.calil.jp/check',
  appkey: '[key]',
  callback: 'getApi',
  apiUrl(isbns, systemids) {
    const url = `${this.baseUrl}?appkey=${this.appkey}&format=json&callback=${this.callback}&isbn=${isbns}&systemid=${systemids}`;
    console.log(url);
    return url;
  },
  getJsonpData(isbns, systemids) {
    const idStr = 'jsonpScript';
    const scriptEl = document.getElementById(idStr);
    if(scriptEl) {
      scriptEl.parentNode.removeChild(scriptEl);
    }
    const script = document.createElement('script');
    script.setAttribute('id', idStr);
    script.src = this.apiUrl(isbns, systemids);
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
  getStorage(storageKey) {
    const getjson = localStorage.getItem(storageKey);
    const obj = JSON.parse(getjson);
    return obj;
  },
}


/**
 * MODEL
 */
class collectionModel {
  constructor(isbn, data) {
    this.isbn = isbn;
    this.data = data;
  }
  getMarkup() {
    let collectionFlg = false;
    let libraryRes = '';
    state.libraryList.forEach(library => {
      // console.log(this.data[library].reserveurl);
      const libkeyRes = this.data[library].status !== 'Error' ? this.data[library].libkey : {};
      if(0 !== Object.keys(libkeyRes).length) {
        // console.log(libkeyRes);
        collectionFlg = true;
        libraryRes += `<p><b>${library}</b></p>`;
        Object.keys(libkeyRes).forEach(key => {
          libraryRes += `<p><a href="${this.data[library].reserveurl}" target="_blank">${key}：${libkeyRes[key]}</a></p>`;
          // console.log(libkeyRes[key]);
        })
      }
    });
    if(!collectionFlg) {
      libraryRes += `<p>蔵書なし</p>`;
    }
    const markup = document.createElement('div');
    markup.setAttribute('class', 'card mb-4');
    markup.innerHTML = `
      <div class="card-body">
        <h5>${this.isbn}</h5>
        ${libraryRes}
      </div>
    `;
    base.collectionList.appendChild(markup);
  }
}


/**
 * VIEW
 */
// jsonpのcallback実行
function getApi(json) {
  // console.log(json.books[state.bookList[0]][state.libraryList[0]]);

  state.bookList.forEach(isbn => {
    new collectionModel(isbn, json.books[isbn]).getMarkup();
  });
  // if(json.length > 0) {
  //   console.log(json);
  // } else {
  //   console.log('結果無し');
  // }
}


/**
 * CONTROLLER
 */
function init() {
  state.bookList = CommonModel.getStorage(base.bookStorageKey);
  state.libraryList = CommonModel.getStorage(base.libraryStorageKey);
  // console.log(bookList, libraryList);
  const bookListQuery = state.bookList.join(',');
  const libraryListQuery = state.libraryList.join(',');
  // console.log(bookListQuery, libraryListQuery);
  api.getJsonpData(bookListQuery, libraryListQuery);

}


/**
 * 実行
 */
init();
