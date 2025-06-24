
// ちなみに importはモジュールの読み込み
// fromはモジュールの指定

// alpinejsを読み込む
import Alpine from 'alpinejs'
// axiosを読み込む
import axios from 'axios'

window.Alpine = Alpine
Alpine.start()

// MBTIの16の性格を作る
// const types = [
//     ["E", "I"],
//     ["N", "S"],
//     ["T", "F"],
//     ["P", "J"]
// ]

const types = [
    { name: "ISTJ", count: 10 },
    { name: "ISFJ", count: 6 },
    { name: "INFJ", count: 7 },
    { name: "INTJ", count: 1 },
    { name: "ISTP", count: 30 },
    { name: "ISFP", count: 4 },
    { name: "INFP", count: 1 },
    { name: "INTP", count: 1 },
    { name: "ESTP", count: 2 },
    { name: "ESFP", count: 10 },
    { name: "ENFP", count: 10 },
    { name: "ENTP", count: 3 },
    { name: "ESTJ", count: 20 },
    { name: "ESFJ", count: 0 },
    { name: "ENFJ", count: 9 },
    { name: "ENTJ", count: 1 }
]


// Sever Sents Eventsを使う
// コネクションを作成
// const url = "https://0f7d-2001-268-985d-58ca-52f-3956-2f9e-6153.ngrok-free.app/sse"
// const es = new EventSource(url);

// // イベントを受け取る
// es.addEventListener("message", (e) => {

//     // 受け取ったデータをJSONに変換
//     // JSON.parseは文字列をオブジェクトに変換する
//     // JSON.stringify => オブジェクトを文字列に変換する
//     const data = JSON.parse(e.data);
//     console.log("message: ", data);

// })
