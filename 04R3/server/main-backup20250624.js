// Node.js用のWebサーバーのexpressを使って、
// Sever Sents Eventsを使う
const express = require('express');
const app = express();
// CORSを有効にする
const cors = require('cors');
const port = 13000;
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

let count = 0;

let yesCount = 0;
let noCount = 0;

app.use(cors());
app.get('/', (req, res) => {
    // hello worldを返す
    res.send('ハンバーグで1日無駄にしました');
});

// // count投票するエンドポイントを作成
// app.get('/vote', (req, res) => {
//     count++;
//     console.log(`Vote count: ${count}`);
//     // イベントを発火
//     eventEmitter.emit('message', { count });
//     // レスポンスを返す
//     res.json({ count });
// })


// /sseエンドポイントを作成
app.get('/sse', (req, res) => {
    // ヘッダーを設定
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // イベントを送信する関数
    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // イベントリスナーを登録
    eventEmitter.on('message', sendEvent);

    // クライアントが接続を切ったときの処理
    req.on('close', () => {
        eventEmitter.removeListener('message', sendEvent);
        res.end();
    });
});

const message = "こんにちは！これはサーバーから送られてきたメッセージです。自動的に送信されてます。すごいでしょ？AIが書けば無限に変化したメッセージを送ることができあmすね　。"


// 一定時間ごとにイベントを発火
// setInterval(() => {
//     count++;
//     const text = message[count % message.length]; // メッセージをループさせる

//     // イベントを発火
//     eventEmitter.emit('message', { text });
// }, 200); 

// Yes か Noの投票を受け付けるendpointを作成
app.get('/vote', (req, res) => {
    const vote = req.query.vote; // クエリパラメータから投票
    if (vote !== 'yes' && vote !== 'no') {
        return res.status(400).json({ error: 'yes か noで送ってね！' });
    }

    if (vote === 'yes') {
        yesCount++;
    } else {
        noCount++;
    }

    eventEmitter.emit('message', { yesCount, noCount });
    res.json({ yesCount, noCount });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
