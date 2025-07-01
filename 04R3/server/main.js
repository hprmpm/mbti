// Node.js用のWebサーバーのexpressを使って、
// Sever Sents Eventsを使う
const express = require('express');
const app = express();
// CORSを有効にする
const cors = require('cors');
const port = 13000;
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

let types = [
    { name: "ISTJ", users: [] },
    { name: "ISFJ", users: [] },
    { name: "INFJ", users: [] },
    { name: "INTJ", users: [] },
    { name: "ISTP", users: [] },
    { name: "ISFP", users: [] },
    { name: "INFP", users: [] },
    { name: "INTP", users: [] },
    { name: "ESTP", users: [] },
    { name: "ESFP", users: [] },
    { name: "ENFP", users: [] },
    { name: "ENTP", users: [] },
    { name: "ESTJ", users: [] },
    { name: "ESFJ", users: [] },
    { name: "ENFJ", users: [] },
    { name: "ENTJ", users: [] }
]

app.use(cors());
app.get('/', (req, res) => {
    // hello worldを返す
    res.send('ハンバーグで1日無駄にしました');
});

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

    // クライアントが接続したときに初期データを送信
    sendEvent({ types });

    // クライアントが接続を切ったときの処理
    req.on('close', () => {
        eventEmitter.removeListener('message', sendEvent);
        res.end();
    });
});


// Yes か Noの投票を受け付けるendpointを作成
app.get('/vote', (req, res) => {
    const type = req.query.type.toUpperCase();
    const userId = req.query.userId;
    if (!type || !userId) {
        return res.status(400).json({ error: 'Type と userId が 必須です' });
    }
    // typesからnameが一致するものを探す
    const index = types.findIndex(t => t.name === type);
    const mbtiType = types.slice()[index];

    if (!mbtiType) {
        return res.status(400).json({ error: '無効なタイプです' });
    }

    // ユーザーIDがすでに投票済みか確認
    if (mbtiType.users.includes(userId)) {
        return res.status(200).json({ error: 'このユーザーはすでに投票済みです' });
    } else {
        // ユーザーIDを追加
        mbtiType.users.push(userId);
    }

    // 入れ替える
    types[index] = mbtiType;

    // イベントを発火
    eventEmitter.emit('message', { types });
    // レスポンスを返す
    res.json({ types });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
