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

    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.dataset.index, 10);
            cards.splice(index, 1);
            renderCards();
        });
    });
}

function createCard(desc, image) {
    cards.push({ desc, image });
    renderCards();
}

function disableButton () {
    if (descInput.value.trim() === "" && imageInput.files.length === 0) {
        saveButton.disabled = true;
        return;
    }
    
    saveButton.disabled = false;
}

imageInput.addEventListener("change", disableButton);

descInput.addEventListener("input", disableButton);

saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const text = descInput.value.trim();
    const file = imageInput.files[0];

    if (!text && !file) return;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            createCard(safeString(text), event.target.result);
            // Очищение полей
            descInput.value = "";
            imageInput.value = "";
            saveButton.disabled = true;
        };
        reader.readAsDataURL(file);
    } else {
        createCard(safeString(text), null);
        descInput.value = "";
        imageInput.value = "";
        saveButton.disabled = true;
    }
});

function safeString(str) {
    return str.replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .trim();
  }
