/**
 * 要素の設定
 */
const base = {
  storageKey: 'storage',
  apiUrl: 'https://www.googleapis.com/books/v1/volumes',
  bookList: document.getElementById('js-book-list'),
};


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
class bookModel {
  constructor(isbn) {
    this.isbn = isbn;
    this.maxDesc = 100;
  }
  getBookData() {
    const url = `${base.apiUrl}?q=isbn:${this.isbn}`;
    // console.log(url);
    const data = new Promise((resolve) => {
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(data => {
          // console.log(data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    });
    return data;
  }
  setHtmlStr() {
    let markup = '';
    const data = this.getBookData();
    data.then(res => {
      // console.log(res.items[0].volumeInfo);
      const itemInfo = res.items[0].volumeInfo;
      let shortDesc = '';
      if(itemInfo.description) {
        // 概要の文字数がmaxDescより多い場合は三点リーダーを付けて省略する
        shortDesc = itemInfo.description.length > this.maxDesc ? itemInfo.description.substr(0, this.maxDesc) + '…' : itemInfo.description;
      } else {
        shortDesc = '---';
      }
      markup += `
        <li class="card mb-3">
          <div class="media card-body">
            <img src="${itemInfo.imageLinks ? itemInfo.imageLinks.thumbnail : 'https://placehold.jp/128x180.png'}" class="mr-3" alt="${itemInfo.title}の書影">
            <div class="media-body">
              <h5 class="mt-0">${itemInfo.title}</h5>
              ${shortDesc}
            </div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detail-modal--${this.isbn}">
              詳細を見る
            </button>
            <a href="collection.html?isbn=${this.isbn}" class="btn btn-primary">図書館蔵書を確認する</a>
            <a href="book-delete.html?isbn=${this.isbn}" class="btn btn-primary">登録解除</a>
          </div>

          <div class="modal fade" id="detail-modal--${this.isbn}" tabindex="-1" role="dialog" aria-labelledby="detail-label--${this.isbn}" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="detail-label--${this.isbn}">${itemInfo.title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h5>概要</h5>
                  <p class="mb-4">${itemInfo.description || '---'}</p>
                  <h5>データ</h5>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row">タイトル</th>
                        <td>${itemInfo.title}</td>
                      </tr>
                      <tr>
                        <th scope="row">著者</th>
                        <td>${itemInfo.authors ? itemInfo.authors.join('／') : '---'}</td>
                      </tr>
                      <tr>
                        <th scope="row">出版社</th>
                        <td>${itemInfo.publisher || '---'}</td>
                      </tr>
                      <tr>
                        <th scope="row">出版日</th>
                        <td>${itemInfo.publishedDate || '---'}</td>
                      </tr>
                      <tr>
                        <th scope="row">ページ数</th>
                        <td>${itemInfo.pageCount || '---'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </li>
      `;
      this.el.innerHTML = markup;
    });
  }
  init() {
    this.el = document.createElement('div');
    bookListView.showBookList(this.el);
    this.el.innerHTML = `
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    `;
    this.setHtmlStr();
  }
}


/**
 * VIEW
 */
const bookListView = {
  showBookList(el) {
    base.bookList.appendChild(el);
  }
}


/**
 * CONTROLLER
 */
function init() {
  const itemList = CommonModel.getStorage();
  itemList.forEach(data => {
    const item = new bookModel(data);
    item.init();
  });
}


/**
 * 実行
 */
init();
