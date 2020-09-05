/**
 * 要素の設定
 */
const base = {
  elements: {
    header: document.querySelector('.my-header'),
    headerIcon: document.querySelector('.my-header__icon'),
    content: document.querySelector('.my-content'),
    sections: document.querySelectorAll('.my-section'),
    menu: document.querySelector('.my-menu'),
    menuItems: document.querySelectorAll('.my-menu__item'),
  }
};


/**
 * MODEL
 */
class IsoModel {
  constructor(observeEl) {
    this.observeEl = observeEl;
    this.topOpt = {
      root: null,
      rootMargin: '0px 0px -100%',
      threshold: 0,
    };
    this.bottomOpt = {
      root: null,
      rootMargin: '-100% 0px 0px',
      threshold: 0,
    };
    this.centerOpt = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0,
    };
  }
  singleObserve(callbackIn, callbackOut, optType) {
    const callback = (entries) => {
      if(entries[0].isIntersecting) {
        if(callbackIn) {
          callbackIn();
        }
      } else {
        if(callbackOut) {
          callbackOut();
        }
      }
    }
    const observer = new IntersectionObserver(callback, this[optType]);
    observer.observe(this.observeEl);
  }
  multipleObserve(callbackIn, callbackOut, optType) {
    const callback = (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          if(callbackIn) {
            callbackIn(entry);
          }
        } else {
          if(callbackOut) {
            callbackOut(entry);
          }
        }
      });
    }
    const observer = new IntersectionObserver(callback, this[optType]);
    this.observeEl.forEach(el => {
      observer.observe(el);
    })
  }
}


/**
 * VIEW
 */
const headerView = {
  iconEl: base.elements.headerIcon,
  headerClearly() {
    base.elements.header.classList.add('is-clearly');
  },
  headerOpacity() {
    base.elements.header.classList.remove('is-clearly');
  },
  headerMenuToggle() {
    this.iconEl.classList.toggle('is-active');
    const target = this.iconEl.dataset.target;
    const menu = document.getElementById(target);
    menu.classList.toggle('is-active');
  },
}

const menuView = {
  menuOffsetTop: base.elements.menu.getBoundingClientRect().top,
  headerHeight: base.elements.header.clientHeight,
  fixMenuOffset: 20,
  currentMenu(entry) {
    menuView.activeClear();
    const currentItem = document.getElementById(entry.target.dataset.target);
    currentItem.classList.add('is-active');
  },
  activeClear() {
    base.elements.menuItems.forEach(item => {
      item.classList.remove('is-active');
    });
  },
  setTopValue() {
    base.elements.menu.style.top = `${this.headerHeight + this.fixMenuOffset}px`;
  }
}


/**
 * CONTROLLER
 */
function init() {
  // ■ サイドメニューの固定位置の設定（ヘッダーの高さを反映）
  menuView.setTopValue();

  // ■ ヘッダーアイコンクリック時のイベント
  base.elements.headerIcon.addEventListener('click', e => {
    e.preventDefault();
    headerView.headerMenuToggle();
  });

  // ■ my-contentの交差を監視してヘッダーのスタイルを変更する
  const contentIso = new IsoModel(base.elements.content);
  contentIso.singleObserve(
      headerView.headerClearly,
      headerView.headerOpacity,
      'topOpt'
  );

  // ■ my-sectionの交差を監視してメニューのスタイルを変更する
  const sectionIso = new IsoModel(base.elements.sections);
  sectionIso.multipleObserve(
      menuView.currentMenu,
      '',
      'centerOpt'
  );
}


/**
 * 実行
 */
init();
