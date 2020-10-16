const conf = {
  storageKey: 'storage',
};

export const DataModel = {
  // ストレージの取得
  getStorage() {
    const getjson = localStorage.getItem(conf.storageKey);
    const obj = JSON.parse(getjson);
    return obj;
  },
  // ストレージの書き込み
  setStorage(storageObj) {
    const setjson = JSON.stringify(storageObj);
    localStorage.setItem(conf.storageKey, setjson);
  },
  // ストレージのクリア
  clearStorage() {
    localStorage.removeItem(conf.storageKey);
  },
  // クッキーの取得
  getCookie() {
    let cookieObj = {};
    const allCookies = document.cookie;
    allCookies.split('; ').forEach(cookies => {
      const cookie = cookies.split('=');
      cookieObj[cookie[0]] = cookie[1];
    });
    return cookieObj;
  },
  // クッキーの書き込み
  setCookie(cookieObj) {
    Object.keys(cookieObj).forEach(key => {
      document.cookie = `${key}=${cookieObj[key]};`;
    });
  },
  // クッキーのクリア
  clearCookie(cookieObj) {
    Object.keys(cookieObj).forEach(key => {
      document.cookie = `${key}=; expires=0`;
    });
  },
  // URLパラメータの取得
  getParams() {
    let paramsObj = {};
    const params = location.search.substring(1).split('&');
    if(params[0] !== '') {
      params.forEach(param => {
        const kv = param.split('=');
        paramsObj[kv[0]] = kv[1];
      });
      return paramsObj;
    } else {
      return null;
    }
  },
}
