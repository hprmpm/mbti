# このプロジェクトは？

普段CDNで読み込んでいるライブラリを
npmを使って利用する。

そのために、モジュールバンドラーのparcelを使う。

- 今回作るもの
    - `MBTIの選択アプリケーション`
- 使うライブラリ
    - parcel
    - date-fns (日付操作ライブラリ)
    - axios (HTTP通信ライブラリ)
        - 前回はブラウザについているfetchを使った


## やること
1. `npm init -y`の実行
    - フォルダをnpmのプロジェクトにする
2. `npm install`の実行
    - package.jsonに記載されたパッケージをインストールする
    - `npm init`の直後はしなくてもよい
3. `npm install parcel`の実行
    - モジュールバンドラーのparcelをインストールする
    - `package.json`に`"scripts": { "start": "parcel index.html" }`を追加する
    - オプション:
        - `-D`をつけると、開発時のみ必要なパッケージとしてインストールされる
        - `--save-dev`も同じ意味
4. `package.json`のscriptsをカスタマイズ
    - `start`と`dev`を追加
5. `npm run start` or `npm start` を実行
    - `npm run xx`の`xx`はコマンド名
