// Liste des articles
const items = [];

// Fonction pour sauvegarder les articles dans le stockage local
function saveItemsToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

// Fonction pour charger les articles depuis le stockage local
function loadItemsFromLocalStorage() {
  const savedItems = localStorage.getItem("items");
  if (savedItems) {
    items.length = 0;
    items.push(...JSON.parse(savedItems));
  }
}

// Mettre à jour l'affichage des articles
function updateItems() {
  const itemsDiv = document.getElementById("items");
  itemsDiv.innerHTML = "";

  if (items.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Ajouter un article pour commencer...";
    emptyMessage.style.textAlign = "center";
    itemsDiv.appendChild(emptyMessage);
  } else {
    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `
      <div class="item-info">
          <h3>${item.name}</h3>
          <p><em>Quantité:</em> ${item.quantity}</p>
          <p><em>Prix:</em> ${
            item.price ? `${item.price.toFixed(2)}€` : "N/A"
          }</p>
      </div>
      <button class="markBoughtButton" onclick="markAsBought(${items.indexOf(
        item
      )})">&check;</button>
      `;
      itemsDiv.appendChild(itemDiv);
    });
  }

  // Mettre à jour le coût total
  const totalCost = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  document.getElementById(
    "totalCost"
  ).textContent = `Coût total ≈ ${totalCost.toFixed(2)}€`;

  // Mettre à jour le compteur du nombre d'articles
  document.getElementById(
    "itemCount"
  ).textContent = `Nombre d'articles : ${items.length}`;

  saveItemsToLocalStorage(); // Sauvegarder les articles dans le stockage local
}

// Marquer un article comme acheté
function markAsBought(index) {
  items.splice(index, 1);
  updateItems();
}

// Initialiser l'application
function init() {
  loadItemsFromLocalStorage(); // Charger les articles depuis le stockage local
  updateItems();
}

// Gérer la soumission du formulaire d'ajout d'article
document
  .getElementById("addItemForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const itemName = document.getElementById("itemName").value;
    const itemQuantity = parseFloat(
      document.getElementById("itemQuantity").value
    );
    const itemPrice =
      parseFloat(document.getElementById("itemPrice").value) || 0;

    if (itemName && itemQuantity) {
      // Ajouter le nouvel article à la liste
      items.push({
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice,
      });
      // Mettre à jour l'affichage des articles
      updateItems();
      // Réinitialiser le formulaire
      document.getElementById("addItemForm").reset();
      document.getElementById("addFormWrapper").classList.remove("show");
    }
  });

const addButton = document.getElementById("addButton");
const addFormWrapper = document.getElementById("addFormWrapper");

addButton.addEventListener("click", () => {
  addFormWrapper.classList.add("show");
});

// Fermer le formulaire d'ajout d'article
addFormWrapper.addEventListener("click", (e) => {
  if (e.target === addFormWrapper) {
    addFormWrapper.classList.remove("show");
  }
});

// Fonction pour vider la liste d'articles
function clearItemList() {
  items.length = 0; // Vide la liste d'articles
  updateItems(); // Met à jour l'affichage
}

// Ajouter un gestionnaire d'événements pour le bouton "Vider la liste"
const clearListButton = document.getElementById("clearListButton");
clearListButton.addEventListener("click", clearItemList);

// Appeler init pour démarrer l'application
init();
