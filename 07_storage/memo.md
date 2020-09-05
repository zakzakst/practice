# MEMO

## 良かった点
- import使うときは「<script type="module" src="js/index.js"></script>」とする必要がある（https://teratail.com/questions/183706）
- また、.jsの拡張子も省略できない

- オブジェクトのプロパティの削除知った（https://www.javadrive.jp/javascript/object/index5.html）

- classList.toggleで追加状態が返ってくるの便利（https://developer.mozilla.org/ja/docs/Web/API/Element/classList）

- 複数の戻り値のきれいな書き方知った（https://qiita.com/hikobotch/items/46072195b228db7b7675）

- formのテキストインプットのエンターキー無効には「keydown」イベントへの対応が必要（https://qiita.com/mimoe/items/89b317be5e38bfbc44ee）
- 普通に「keydown」のイベントオブジェクトに「preventDefault」すると「delete」キーも無効になってしまうので気を付ける。

## 悪かった点・疑問点
- modelとviewで同じ関数が出る書き方は適切なのか？stateとのやりとりの切り分けの考え方とかもうちょっと覚えたい。

- バリデーションのところはクラス名の付け方を工夫すれば、もう少しキレイなスクリプトかけたと思う。

- data-validみたいな形でhtml側にもバリデーション情報のエレメントにアクセスするための情報つけておいたほうがよかったか？

- 大分、書き方の効率が悪い。複数モジュールでファイルを分けた際の、共通部分の作り方はもっと勉強が必要

## その他
- バリデーションは別でもう一回練習する
