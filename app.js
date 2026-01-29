// Récupération des éléments HTML
const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const itemList = document.getElementById("itemList");
const emptyMessage = document.getElementById("emptyMessage");

// Tableau des articles
// Chaque article est un objet : { name: string, bought: boolean }
let items = JSON.parse(localStorage.getItem("items")) || [];

// Sauvegarde dans le localStorage
function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
}

// Affichage de la liste
function displayItems() {
    itemList.innerHTML = "";

    if (items.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    items.forEach((item, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = item.name;

        // Style si acheté
        if (item.completed) {
            span.classList.add("completed");
        }

        // Marquer comme acheté

        span.addEventListener("click", () => {
            item.completed = !item.completed;
            saveItems();
            displayItems();
        });
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actions");

        // Bouton modifier


        const editBtn = document.createElement("button");
        editBtn.textContent = " modifier✏️";

        editBtn.classList.add("edit");
        editBtn.addEventListener("click", () => {
            const newValue = prompt("Modifier l'article :", item.name);
            if (newValue && newValue.trim() !== "") {
                item.name = newValue.trim();
                saveItems();
                displayItems();
            }
        });

        // Bouton supprimer
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = " supprimer❌";
        deleteBtn.classList.add("delete")

        deleteBtn.addEventListener("click", () => {
            items.splice(index, 1);
            saveItems();
            displayItems();
        });

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actionsDiv);
        // li.appendChild(editBtn);
        // li.appendChild(deleteBtn);

        itemList.appendChild(li);

    });

}

// Ajouter un article
addBtn.addEventListener("click", () => {
    const value = itemInput.value.trim();

    if (value === "" || items.some(item => item.name === value)) {
        alert("Article invalide ou déjà existant");
        return;
    }

    items.push({ name: value, bought: false });
    saveItems();
    displayItems();
    itemInput.value = "";
});

// Bouton TOUT SUPPRIMER
clearBtn.addEventListener("click", () => {
    if (confirm("Voulez-vous supprimer toute la liste ?")) {
        items = [];
        saveItems();
        displayItems();
    }
});