// apiの設定
const api = {
  baseUrl: 'https://www.googleapis.com/books/v1/volumes',
  maxResults: 10,
  url(query, start = 0, max = this.maxResults) {
    const paramQuery = `?q=${query}`;
    const paramStart = `&startIndex=${start}`;
    const paramMax = `&maxResults=${max}`;
    return this.baseUrl + paramQuery + paramStart + paramMax;
  }
};


// jsonデータの取得
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


// model
class bookItem {
  // 検索結果の本の情報カード
}


// view
const searchView = {
  showResult(data) {
    // 検索結果の表示
  },
  showMessage(message) {
    // メッセージの表示
  },
  clearResult() {
    // 検索結果をクリア
  },
};


// init
function init() {
  const query = '辻村深月';
  getJsonData(api.url(query)).then(data => {
    console.log(data);
  });
}


// 初期化
init();
