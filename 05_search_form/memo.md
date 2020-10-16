# MEMO

## 良かった点
- idとキーを同じ値にすることで、クリック時のoptionのvalueからアクセスしやすいのはメリット。

- 入力候補を出さない設定方法を知った（https://www.softel.co.jp/blogs/tech/archives/4914）

- breakってfor文でも使えるの知った（https://www.sejuku.net/blog/48252）※最初forEachでやろうとして動かなかった。

- focusoutだとバブリングする（https://developer.mozilla.org/ja/docs/Web/API/Element/focusout_event）

- bulmaにmodalもあった！すごい（https://bulma.io/documentation/components/modal/）

- 「let x = foo || ''」の書き方知った（短絡演算：https://www.webprofessional.jp/shorthand-javascript-techniques/）

- 短絡演算使うときundefindの判定する場所気を付ける（今回の場合だと「showBreadCrumbs(type)のconst bcCategoryText」のところ

- DOM挿入後にクラス名の追加したい場合は「document.createElement」から「appendChild」使う

## 悪かった点・疑問点
- データのjsonの構成方法が少し迷う。。町のデータ取ってくるときに記述が助長なってしまっている。

- option部分の描画、関数一つに出来なかったか？

- cookieの書き込み・読み込みもやりたかったけど、ちょっとこんがらがりそうなので、次に回す。（※追々両方の機能もったスクリプト書く）

- 目的セレクトのパンくずのような階層構造のデータの描画のもうちょっと効率的な書き方を知りたい

- jsonデータのパスとかもbaseのところに登録しておくといいかもしれない

- アニメーションのこと考えるなら、目的選択の項目変化は「purposeView.setList」の一つでやるのでなく「show」と「hide」とかに分けたほうが良かったか？（※一度にやるパターンだと、アニメーションによっては、初期表示の時に変な感じになったりする懸念）
