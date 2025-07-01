const BASE_URL = 'http://localhost:13000';
const USER_ID = 'user-' + Math.random().toString(36).substring(2, 9);

const selectSection = document.getElementById("select-section");
const resultSection = document.getElementById("result-section");
const selectView = document.getElementById("select-view");
const resultView = document.getElementById("result-view");

let allTypes = [];
let voted = false;
let selectedType = null;

function render() {
    if (voted) {
        showResultGrid();
    } else {
        showSelectGrid();
    }
}


function showSelectGrid() {
    selectSection.style.display = "block";
    resultSection.style.display = "none";
    selectView.innerHTML = "";

    const template = document.getElementById("item-template");
    if (!template) return;

    allTypes.forEach(type => {
        const cardFragment = template.content.cloneNode(true);
        const card = cardFragment.querySelector('.card');
        card.querySelector(".name").textContent = type.name;
        card.addEventListener("click", () => handleVote(type.name));
        selectView.appendChild(cardFragment);
    });
}

function showResultGrid() {
    selectSection.style.display = "none";
    resultSection.style.display = "block";
    resultView.innerHTML = "";

    const template = document.getElementById("result-template");
    if (!template) return;

    const totalCount = allTypes.reduce((sum, type) => sum + type.users.length, 0);

    allTypes.forEach(type => {
        const cardFragment = template.content.cloneNode(true);
        const card = cardFragment.querySelector('.card');
        
        card.querySelector(".name").textContent = type.name;
        card.querySelector(".count").textContent = type.users.length;
        card.querySelector(".total").textContent = totalCount;
        
        const percent = totalCount === 0 ? 0 : (type.users.length / totalCount) * 100;
        card.querySelector(".percentage").style.width = percent + "%";

        if (type.name === selectedType) {
            card.classList.add("selected");
        }
        
        resultView.appendChild(cardFragment);
    });
}

async function handleVote(typeName) {
    if (voted) return;
    
    try {
        await fetch(`${BASE_URL}/vote?userId=${USER_ID}&type=${typeName}`);
        voted = true;
        selectedType = typeName;
    } catch (error) {
        console.error("Error voting:", error);
    }
}

function initializeSSE() {
    const es = new EventSource(`${BASE_URL}/sse`);

    es.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.types) {
            allTypes = data.types.sort((a, b) => b.users.length - a.users.length);
            
            if (!voted) {
                for (const type of allTypes) {
                    if (type.users.includes(USER_ID)) {
                        voted = true;
                        selectedType = type.name;
                        break;
                    }
                }
            }
            
            render();
        }
    };

    es.onerror = (err) => {
        console.error("EventSource failed:", err);
        es.close();
    };
}

initializeSSE();