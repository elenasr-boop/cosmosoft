const cardsEl = document.getElementById("cards");
const descInput = document.getElementById("desc-input");
const imageInput = document.getElementById("image-input");
const saveButton = document.getElementById("save-button");
let cards = [];

function renderCards() {
    cardsEl.innerHTML = cards.slice().reverse().map((card) => {
        return `
            <div class="card">
                ${card.image ? `<img src="${card.image}" alt="" class="card_img">` : ""}
                <p class="card_desc">${card.desc}</p>
                <button class="delete-button" data-index="${cards.indexOf(card)}">Удалить</button>
            </div>
        `;
    }).join("");
}

function createCard(desc, image) {
    cards.push({ desc, image });
    renderCards();
}

saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const text = descInput.value.trim();
    const file = imageInput.files[0];

    if (!text && !file) return;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            createCard(text, event.target.result);
            // Очищение полей
            descInput.value = "";
            imageInput.value = "";
        };
        reader.readAsDataURL(file);
    } else {
        createCard(text, null);
        descInput.value = "";
        imageInput.value = "";
    }
});
