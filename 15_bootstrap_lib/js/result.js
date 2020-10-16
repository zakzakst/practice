// 要素
const base = {
  searchInfo: document.getElementById('js-search-info__content'),
  searchResult: document.getElementById('js-search-result'),
  pagenation: document.getElementById('js-pagenation'),
};


// apiの設定
const api = {
  baseUrl: 'https://www.googleapis.com/books/v1/volumes',
  maxResults: 10,
  url(query, start = 0, max = this.maxResults) {
    const paramQuery = `?q=${query}`;
    const paramStart = `&startIndex=${start}`;
    const paramMax = `&maxResults=${max}`;
    console.log(this.baseUrl + paramQuery + paramStart + paramMax);
    return this.baseUrl + paramQuery + paramStart + paramMax;
  },
  getQueryStr(keyword = '', title = '', author = '', isbn = '') {
    // 全てのパラメータが設定されていない場合は何も返さない
    if(!keyword && !title && !author && !isbn) { return; }
    if(isbn) {
      // ISBNコードが指定されている場合は詳細結果を表示する
      return `+isbn:${isbn}`;
    } else {
      const paramKeyword = keyword ? keyword : '';
      const paramTitle = title ? `+intitle:${title}` : '';
      const paramAuthor = author ? `+inauthor:${author}` : '';
      return paramKeyword + paramTitle + paramAuthor;
    }
  }
};


// 状態保管用のオブジェクト
const state = {
  searchKeyword: '',
  searchTitle: '',
  searchAuthor: '',
  searchIsbn: '',
  currentPage: 1,
  resultData: null,
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


// view
const resultView = {
  showSearchInfo() {
    // 検索条件を表示
    const markup = `
      <p><strong>■キーワード</strong>：${state.searchKeyword}</p>
      <p><strong>■タイトル</strong>：${state.searchTitle}</p>
      <p><strong>■著者名</strong>：${state.searchAuthor}</p>
      <p><strong>■ISBN</strong>：${state.searchIsbn}</p>
    `;
    base.searchInfo.insertAdjacentHTML('beforeend', markup);
  },
  clearResult() {
    base.searchResult.innerHTML = '';
    base.pagenation.innerHTML = '';
  },
  showResult(data) {
    // 検索結果を表示
    console.log(data.items);
    const maxDesc = 100;
    let markup = '';
    data.items.forEach((item, index) => {
      const info = item.volumeInfo;
      let isbnStr = '';
      let registerBtnStr = '';
      if(info.industryIdentifiers) {
        info.industryIdentifiers.forEach(isbn => {
          isbnStr += `
            <tr>
              <th scope="row">${isbn.type}</th>
              <td>${isbn.identifier}</td>
            </tr>
          `;
          if(isbn.type === 'ISBN_13' || isbn.type === 'ISBN_10') {
            registerBtnStr = `<a href="register.html?isbn=${isbn.identifier}" class="btn btn-primary">お気入り登録</a>`;
          }
        });
      }
      let shortDesc = '';
      if(info.description) {
        // 概要の文字数がmaxDescより多い場合は三点リーダーを付けて省略する
        shortDesc = info.description.length > maxDesc ? info.description.substr(0, maxDesc) + '…' : info.description;
      } else {
        shortDesc = '---';
      }
      markup += `
        <div class="card mb-3">
          <div class="media card-body">
            <img src="${info.imageLinks ? info.imageLinks.thumbnail : 'https://placehold.jp/128x180.png'}" class="mr-3" alt="${info.title}の書影">
            <div class="media-body">
              <h5 class="mt-0">${info.title}</h5>
              ${shortDesc}
            </div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detail-modal--${index}">
              詳細を見る
            </button>
            ${registerBtnStr}
          </div>

          <div class="modal fade" id="detail-modal--${index}" tabindex="-1" role="dialog" aria-labelledby="detail-label--${index}" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="detail-label--${index}">${info.title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h5>概要</h5>
                  <p class="mb-4">${info.description || '---'}</p>
                  <h5>データ</h5>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row">タイトル</th>
                        <td>${info.title}</td>
                      </tr>
                      <tr>
                        <th scope="row">著者</th>
                        <td>${info.authors ? info.authors.join('／') : '---'}</td>
                      </tr>
                      <tr>
                        <th scope="row">出版社</th>
                        <td>${info.publisher || '---'}</td>
                      </tr>
                      <tr>
                        <th scope="row">出版日</th>
                        <td>${info.publishedDate || '---'}</td>
                      </tr>
                      <tr>
                        <th scope="row">ページ数</th>
                        <td>${info.pageCount || '---'}</td>
                      </tr>
                      ${isbnStr}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    this.clearResult();
    base.searchResult.insertAdjacentHTML('beforeend', `<ul class="list-unstyled">${markup}</ul>`);
    this.showPagenation(data.totalItems);
  },
  showPagenation(dataNum) {
    // ページネーションを表示
    // console.log('show pagenation');
    // console.log(Math.ceil(dataNum / api.maxResults));
    console.log(dataNum);
    const pageNum = Math.ceil(dataNum / api.maxResults);
    const currentPageNum = state.currentPage;
    let markup = `
      <li class="page-item${currentPageNum < 2 ? ' disabled' : ''}"><a class="page-link" href="#" data-target-page="${currentPageNum - 1}">Prev</a></li>
      <li class="page-item active"><a class="page-link" href="#" data-target-page="${currentPageNum}">${currentPageNum}</a></li>
      <li class="page-item"><a class="page-link" href="#" data-target-page="${currentPageNum + 1}">Next</a></li>
    `;
    base.pagenation.insertAdjacentHTML('beforeend', `<nav aria-label="ページネーション"><ul class="pagination">${markup}</ul></nav>`);
  },
  showNoResult() {
    // 「検索結果なし」の文言を表示
    // console.log('エラー');
    const markup = `
      <div class="alert alert-warning" role="alert">データが取得できませんでした。<a href="search.html" class="alert-link">検索ページ</a>より別の文言で試してください。</div>
    `;
    base.searchResult.innerHTML = markup;
  },
  getBookData(pageNum) {
    // 検索クエリのパラメータを作成
    const query = api.getQueryStr(state.searchKeyword, state.searchTitle, state.searchAuthor, state.searchIsbn);
    // ページ数から検索結果の取得開始位置を出す
    const startIndex = (pageNum - 1) * api.maxResults;
    // 検索apiのurlを取得
    const apiUrl = api.url(query, startIndex);
    // 検索結果を取得
    return getJsonData(apiUrl);
  },
  renderController(pageNum) {
    this.getBookData(pageNum).then(data => {
      if(data.totalItems !== 0) {
        // データを取得できた場合、検索結果を表示する
        this.showResult(data);
      } else {
        // データを取得できない場合、メッセージを表示する
        this.showNoResult();
      }
    });
  },
};


// 初期化
function init() {
  // パラメータの取得
  const param = getParams();
  if(param) {
    // パラメータがある場合、「state」に代入
    state.searchKeyword = decodeURI(param.keyword) || '';
    state.searchTitle = decodeURI(param.title) || '';
    state.searchAuthor = decodeURI(param.author) || '';
    state.searchIsbn = decodeURI(param.isbn) || '';
  } else {
    // パラメータがない場合、検索ページにリダイレクト
    location.href = 'search.html';
  }

  // 検索条件を表示
  resultView.showSearchInfo();

  // 検索結果を表示
  resultView.renderController(state.currentPage);

  // ページネーションクリック時の挙動
  base.pagenation.addEventListener('click', e => {
    e.preventDefault();
    // console.log(e.target.dataset['targetPage']);
    state.currentPage = Number(e.target.dataset['targetPage']);
    resultView.renderController(state.currentPage);
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// 初期化の実行
init();
