const apiUrl = "http://localhost:3000/items";

// Funktion zum Abrufen und Anzeigen aller Items
function fetchItems() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((items) => {
      const list = document.getElementById("itemList");
      list.innerHTML = "";

      items.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.name;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Bearbeiten";
        editBtn.onclick = () => {
          const newName = prompt("Neuer Name:", item.name);
          if (newName) updateItem(index, newName);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Löschen";
        deleteBtn.onclick = () => deleteItem(index);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
      });
    });
}

// Funktion zum Hinzufügen eines neuen Items
function addItem() {
  const input = document.getElementById("newItem");
  const name = input.value.trim();
  if (!name) return;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).then(() => {
    input.value = "";
    fetchItems();
  });
}

// Funktion zum Aktualisieren eines Items
function updateItem(id, newName) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  }).then(() => fetchItems());
}

// Funktion zum Löschen eines Items
function deleteItem(id) {
  fetch(`${apiUrl}/${id}`, { method: "DELETE" }).then(() => fetchItems());
}

// Initialer Aufruf
fetchItems();
