// Importieren der benötigten Module
import express from "express"; 
import fs from "fs"; // Dateisystem-Modul, um mit Dateien zu arbeiten
import cors from "cors"; 

const app = express(); // Initialisieren der Express-Anwendung
const PORT = 3000; // Port, auf dem der Server laufen soll
const DB_FILE = "db.json"; // Datei, in der die Daten gespeichert werden

// Middleware aktivieren:
// Erlaubt Cross-Origin-Zugriffe aller Frontend-Clients
app.use(cors());
// Erlaubt das Parsen von JSON-Daten im Body von Anfragen mit application/json
app.use(express.json());

/**
 * Liest den Inhalt der Datenbankdatei (db.json) und gibt das geparste JSON zurück.
 */
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

/**
 * Schreibt die übergebenen Daten als formatiertes JSON in die Datenbankdatei.
 * @param {Array} data - Die zu speichernden Daten
 */
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET-Endpunkt: Gibt alle Items zurück
app.get("/items", (req, res) => {
  res.json(readDB()); // Antwort ist der Inhalt der Datenbank
});

// POST-Endpunkt: Fügt ein neues Item hinzu
app.post("/items", (req, res) => {
  const data = readDB(); // Aktuelle Daten aus der Datei lesen
  data.push(req.body); // Neues Item hinzufügen
  writeDB(data); // Daten zurück in die Datei schreiben
  res.status(201).json({ message: "Item added" }); // Erfolgsantwort
});

// PUT-Endpunkt: Aktualisiert ein bestehendes Item anhand seiner ID (Index in der Liste)
app.put("/items/:id", (req, res) => {
  const data = readDB(); // Aktuelle Daten lesen
  const id = parseInt(req.params.id); // ID aus der URL holen und in Zahl umwandeln

  if (data[id]) {
    data[id] = req.body; // Item an der Stelle ersetzen
    writeDB(data); // Geänderte Daten speichern
    res.json({ message: "Item updated" }); // Erfolgsantwort
  } else {
    res.status(404).json({ message: "Item not found" }); // Fehler, wenn ID ungültig
  }
});

// DELETE-Endpunkt: Löscht ein Item anhand seiner ID (Index)
app.delete("/items/:id", (req, res) => {
  const data = readDB(); // Daten lesen
  const id = parseInt(req.params.id); // ID aus URL extrahieren

  if (data[id]) {
    data.splice(id, 1); // Eintrag an Position ID entfernen
    writeDB(data); // Datei aktualisieren
    res.json({ message: "Item deleted" }); // Erfolgsantwort
  } else {
    res.status(404).json({ message: "Item not found" }); // Fehlerantwort
  }
});

// Startet den Server auf dem angegebenen Port
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
