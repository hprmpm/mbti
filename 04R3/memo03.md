## 使う技術・ツール

### Server Sent Events (SSE) - サーバ送信イベント
https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events/Using_server-sent_events
 
### ngrok
https://ngrok.com/
 

## やること
1. 前回作ったMBTIの選択アプリをAlpine.jsで一部書き直す
2. SSEを使って、サーバーからデータの送受信をできるようにする
3. 選択したらサーバにデータを送信する
4. 受信したらデータを反映

## ポイント
- x-data
    - Alpine.jsを使うための属性。データを定義。
- x-for
    - 繰り返しで使う属性。templateとセット。
- JavaScriptのオブジェクト(連想配列)
    - 配列: 順序を持ったデータの集まり
    - 連想配列: keyに対してvalueがあるデータの集まり
- JavaScriptでは、関数は変数や定数に入れることができる

```javascript
let num1 = 0
const num2 = 1
const text1 = "aaa"

// 関数
function 名前(引数) {
    return "戻り値"
}

// 無名関数
function (引数) {
    return "戻り値"
}

// 無名関数 + 定数宣言
const 名前 = function(引数) {
    return "戻り値"
} 
名前() // 呼び出す

// オブジェクト (key : value)
{
    "key": () => {
        return "aaa"
    }
}

```
