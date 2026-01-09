const emojis = ["🐶", "🐱", "🦊", "🐼", "🐵", "🐸", "🐯", "🦁","🐷","🐭","🐰","👶"];
let cardsArray = [...emojis, ...emojis]; 
cardsArray.sort(() => Math.random() - 0.5);

const container = document.querySelector(".game-container");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let matchedCount = 0;

// Generate cards
cardsArray.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="front">${item}</div>
        <div class="back"></div>
    `;
    container.appendChild(card);

    card.addEventListener("click", () => flipCard(card));
});

function flipCard(card) {
    if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

    card.classList.add("flip");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
    let isMatch =
        firstCard.querySelector(".front").innerText ===
        secondCard.querySelector(".front").innerText;

    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedCount += 2;  
        if (matchedCount === cardsArray.length) {
            setTimeout(() => {
                document.getElementById("popup").style.display = "flex";
            }, 500);
        }

        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            resetBoard();
        }, 800);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
