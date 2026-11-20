# yapr.css

Rails で一覧とフォームを小さく始めるための CSS。JavaScript は不要です。

```sh
npm ci
npm run build   # dist/yapr.css と dist/yapr.min.css を生成して終了
npm run dev     # 同じ2ファイルを変更時に再生成
```

生成したどちらか一方をアプリの CSS として読み込みます。既存のクラスや変数はそのままです。Rails 向けの一覧・フォームの余白やエラー表示を使うときは、ページを `<main class="yapr-rails">` で囲みます。テーブルの横スクロールが必要なときだけ、ラベル付きの `.yapr-table-wrap` を使います。

## Rails の実例

Ruby 3.2 以上と Bundler を使用します。リポジトリのルートでビルドしてから、ローカルで起動してください。

```sh
npm run build
cd examples/rails
bundle install
bundle exec rackup --server webrick --host 127.0.0.1 --port 9292
```

- [標準に近い div 一覧](http://127.0.0.1:9292/products)と、任意の[テーブル版](http://127.0.0.1:9292/products?layout=table)を比べられます。
- 一覧・編集画面の「CSSなしで比較」で、同じ一覧・フォームからCSS 1枚だけを外した見た目を確認できます。
- [編集画面](http://127.0.0.1:9292/products/edit)で商品名を空にして保存すると、Rails の検証が失敗し、422 と入力エラーが返ります。ブラウザ側の入力チェックは、この失敗を試せるようデモ内だけで無効にしています。
- サンプルは Rails のフォーム生成・バリデーションを使います。データベースなしのローカル用デモなので、成功した変更も再起動すると消えます。
- 従来の HTML デモはビルド後に `examples/index.html` を開くと確認できます。
