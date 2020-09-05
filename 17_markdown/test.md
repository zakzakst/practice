## 今後

#### フォルダ構成

```
iret
 |recruit2020
 |new-recruit2020（リニューアル作業アップ用）
```

#### リニューアル作業
developブランチから修正用のブランチを切って作業。
検証環境アップは「/new2020」ディレクトリを利用。

```mermaid
sequenceDiagram
  participant 検証環境（/new2020）
  participant develop

  develop ->> develop : 修正
  develop ->> 検証環境（/new2020） : 修正内容
```

#### その他の軽微・即時公開の修正
masterブランチから直接、修正用のブランチを切って作業。
検証環境アップは「/2020」ディレクトリを利用。

```mermaid
sequenceDiagram
  participant 本番環境
  participant 検証環境
  participant master

  master ->> master : 修正
  master ->> 検証環境 : 修正内容
  検証環境 ->> 本番環境 : 本番反映
```

## 全体図
```mermaid
sequenceDiagram
  participant 本番環境
  participant 検証環境
  participant 検証環境（/new2020）
  participant master
  participant develop

  Note over 本番環境,develop : 今まで：developブランチの修正をそのまま検証環境にアップ
  develop ->> develop : ナビ修正・研修ページ追加
  develop ->> 検証環境 : 修正内容
  Note over 本番環境,develop : 今日：本番公開
  develop ->> master : マージ
  検証環境 ->> 本番環境 : 本番公開
  Note over 本番環境,develop : 今後の作業
  master ->> master : 軽微な修正
  master ->> 検証環境 : 修正内容
  検証環境 ->> 本番環境 : 本番公開
  develop ->> develop : リニューアル修正
  develop ->> 検証環境（/new2020） : 修正内容
  Note over 本番環境, develop : リニューアル公開
  develop ->> master : マージ
  検証環境（/new2020） ->> 検証環境 : ディレクトリごと上書き
  検証環境 ->> 本番環境 : 本番公開
  Note over 検証環境（/new2020） : 公開完了後、フォルダ削除
```
