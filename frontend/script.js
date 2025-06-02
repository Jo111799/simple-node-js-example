// URL der API, mit der kommuniziert wird
const apiUrl = "http://localhost:3000/items";

// Funktion zum Abrufen und Anzeigen aller Items von der API
async function fetchItems() {
  // Abrufen der Daten von der API
  const res = await fetch(apiUrl);
  // Umwandeln der Antwort in ein JSON-Objekt
  const items = await res.json();

  // Referenz auf die HTML-Liste, in der die Items angezeigt werden
  const list = document.getElementById("itemList");
  // Leeren der Liste, bevor neue Elemente eingefügt werden
  list.innerHTML = "";

  // Durchlauf aller empfangenen Items
  items.forEach((item, index) => {
    // Erstellen eines neuen Listenelements für jedes Item
    const li = document.createElement("li");
    li.textContent = item.name; // Anzeige des Item-Namens

    // Erstellen des Bearbeiten-Buttons
    const editBtn = document.createElement("button");
    editBtn.textContent = "Bearbeiten";
    // Beim Klick wird ein Prompt geöffnet, um den neuen Namen einzugeben
    editBtn.onclick = () => {
      const newName = prompt("Neuer Name:", item.name);
      // Wenn ein neuer Name eingegeben wurde, Item aktualisieren
      if (newName) updateItem(index, newName);
    };

    // Erstellen des Löschen-Buttons
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    // Beim Klick wird das Item gelöscht
    deleteBtn.onclick = () => deleteItem(index);

    // Buttons dem Listeneintrag hinzufügen
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Listeneintrag zur Liste im DOM hinzufügen
    list.appendChild(li);
  });
}

// Funktion zum Hinzufügen eines neuen Items
async function addItem() {
  // Referenz auf das Eingabefeld für neue Items
  const input = document.getElementById("newItem");
  // Name aus dem Eingabefeld holen und Leerzeichen entfernen
  const name = input.value.trim();

  // Wenn der Name leer ist, nichts tun
  if (!name) return;

  // Senden einer POST-Anfrage an die API zum Hinzufügen des neuen Items
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }), // Name als JSON senden
  });

  // Eingabefeld leeren
  input.value = "";
  // Aktualisierte Liste neu laden
  fetchItems();
}

// Funktion zum Aktualisieren eines Items
async function updateItem(id, newName) {
  // Senden einer PUT-Anfrage an die API mit neuem Namen
  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }), // Neuer Name als JSON
  });

  // Aktualisierte Liste neu laden
  fetchItems();
}

// Funktion zum Löschen eines Items
async function deleteItem(id) {
  // Senden einer DELETE-Anfrage an die API
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

  // Aktualisierte Liste neu laden
  fetchItems();
}

// Initialer Aufruf, um die Liste beim Laden der Seite anzuzeigen
fetchItems();
