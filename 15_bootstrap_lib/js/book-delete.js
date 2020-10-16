/**
 * 要素の設定
 */
const base = {
  storageKey: 'storage',
  registerMessage: document.getElementById('js-delete-message'),
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
  // ストレージの書き込み
  setStorage(obj) {
    const setjson = JSON.stringify(obj);
    localStorage.setItem(base.storageKey, setjson);
  },
  // URLパラメータの取得
  getParams() {
    let paramsObj = {};
    const params = location.search.substring(1).split('&');
    params.forEach(param => {
      const kv = param.split('=');
      paramsObj[kv[0]] = kv[1];
    });
    return paramsObj;
  }
}


/**
 * 状態の設定
 */
const state = {
  bookList: null,
};


/**
 * VIEW
 */
const registerView = {
  showMessage(message) {
    base.registerMessage.innerHTML = message;
  },
};


/**
 * CONTROLLER
 */
function init() {
  // ローカルストレージを読み込んでstateにセットする
  state.bookList = CommonModel.getStorage() || [];

  // お気に入り登録
  if(CommonModel.getParams() && CommonModel.getParams().isbn) {
    // isbnパラメータがある場合
    // console.log('パラメータの内容をストレージに登録');
    const isbn = CommonModel.getParams().isbn;
    // まだ登録されていないisbnの場合、追加する
    const index = state.bookList.indexOf(isbn);
    if(index !== -1) {
      state.bookList.splice(index, 1);
      CommonModel.setStorage(state.bookList);
      registerView.showMessage(`${isbn} の登録を解除しました。`);
    } else {
      registerView.showMessage(`${isbn} は未登録です。`);
    }
  } else {
    // isbnパラメータがない場合
    // console.log('検索ページにリダイレクト');
    location.href = 'search.html';
  }
}


/**
 * 実行
 */
init();
