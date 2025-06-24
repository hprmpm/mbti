const types = [
    {
        name: "ISTJ",
        count: 10
    },
    {
        name: "ISFJ",
        count: 6
    },
    {
        name: "INFJ",
        count: 7
    },
    {
        name: "INTJ",
        count: 1
    },
    {
        name: "ISTP",
        count: 30
    },
    {
        name: "ISFP",
        count: 4
    },
    {
        name: "INFP",
        count: 1
    },
    {
        name: "INTP",
        count: 1
    },
    {
        name: "ESTP",
        count: 2
    },
    {
        name: "ESFP",
        count: 44
    },
    {
        name: "ENFP",
        count: 10
    },
    {
        name: "ENTP",
        count: 3
    },
    {
        name: "ESTJ",
        count: 20
    },
    {
        name: "ESFJ",
        count: 0
    },
    {
        name: "ENFJ",
        count: 9
    },
    {
        name: "ENTJ",
        count: 1
    }
];
const selectSection = document.getElementById("select-section");
const resultSection = document.getElementById("result-section");
const selectView = document.getElementById("select-view");
const resultView = document.getElementById("result-view");
// MBTIタイプ選択画面を表示する
function showSelectGrid() {
    selectSection.style.display = "";
    resultSection.style.display = "none";
    selectView.innerHTML = "";
    const template = document.getElementById("item-template");
    types.forEach((type)=>{
        const card = template.content.cloneNode(true);
        card.querySelector(".name").textContent = type.name;
        card.querySelector(".card").addEventListener("click", ()=>{
            showResultGrid(type.name);
        });
        selectView.appendChild(card);
    });
}
// 結果画面を表示する
function showResultGrid(selectedName) {
    selectSection.style.display = "none";
    resultSection.style.display = "";
    resultView.innerHTML = "";
    const template = document.getElementById("result-template");
    const totalCount = types.reduce((sum, type)=>sum + type.count, 0);
    types.forEach((type)=>{
        const card = template.content.cloneNode(true);
        card.querySelector(".name").textContent = type.name;
        card.querySelector(".count").textContent = type.count;
        card.querySelector(".total").textContent = totalCount;
        const percent = totalCount === 0 ? 0 : type.count / totalCount * 100;
        card.querySelector(".percentage").style.width = percent + "%";
        if (type.name === selectedName) card.querySelector(".card").classList.add("selected");
        resultView.appendChild(card);
    });
    // 結果カードをクリックすると選択画面に戻る
    resultView.querySelectorAll(".card").forEach((card)=>{
        card.addEventListener("click", showSelectGrid);
    });
}
showSelectGrid();

//# sourceMappingURL=04.aa69868b.js.map
