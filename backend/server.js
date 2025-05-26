import express from "express";
import cors from "cors";

const app = express();
// Erstelle eine neue Express-Anwendung. Diese Anwendung wird deinen Webserver darstellen.

// CORS aktivieren: Erlaube, dass der Server Anfragen von anderen Webseiten akzeptiert.
app.use(cors());
// Mit dieser Zeile wird CORS aktiviert, so dass der Server Anfragen von anderen Ursprüngen (z. B. http://127.0.0.1:8080) akzeptiert.

// Middleware zum Parsen von JSON-Body (wichtig für POST-Requests mit JSON-Daten)
app.use(express.json());

// Middleware zum Loggen von Anfragen
app.use((req, res, next) => {
  const currentTime = new Date().toISOString(); // Aktuellen Zeitstempel holen
  console.log(`[${currentTime}] ${req.method} ${req.url}`); // HTTP-Methode und URL in der Konsole ausgeben
  next(); // Wichtig, um die Anfrage an die nächste Middleware oder Route weiterzuleiten
});

// Eine Route für "/api/message" definieren, die auf GET-Anfragen reagiert.
// Sowohl res (Response) als auch req (Request) sind Objekte in Express. Sie repräsentieren die HTTP-Anfrage und die HTTP-Antwort.
app.get("/api/message", (req, res) => {
  // Wenn jemand die URL "/api/message" aufruft, wird dieser Code ausgeführt.

  res.status(200);
  res.json({ message: "Hallo aus Node.js!" });
  // Der Server antwortet mit einem JSON-Objekt, das die Nachricht "Hallo aus Node.js!" enthält.

  // Alternativ: res.sendStatus(200); // Antwort mit Statuscode 200 (OK) senden
});

// Neue POST-Route, die Body- und Query-Parameter verarbeitet
app.post("/api/greet", (req, res) => {
  // Name wird aus dem JSON-Body geholt
  const { name } = req.body;
  // Sprache wird aus den Query-Parametern geholt
  const { lang } = req.query;

  // Prüfe, ob ein Name im Body gesendet wurde
  if (!name) {
    res.status(400);
    return res.json({ error: "Kein Name im Body angegeben!" });
  }

  // Begrüßung abhängig von der Sprache zusammensetzen
  let greeting;
  if (lang === "de") {
    greeting = `Hallo, ${name}!`;
  } else if (lang === "en") {
    greeting = `Hello, ${name}!`;
  } else {
    greeting = `Hi, ${name}!`;
  }

  // Die Begrüßung als JSON an den Client zurückgeben
  res.json({ "greeting": greeting });
});

// Lege die Portnummer fest, auf der der Server laufen soll.
const PORT = 3000;
// Dies ist der Port, auf dem der Server Anfragen entgegennimmt. In diesem Fall ist es Port 3000.

// Starte den Server und lasse ihn auf dem angegebenen Port lauschen.
app.listen(PORT, () => {
  // Der Server beginnt, auf Anfragen zu hören.

  console.log(`Server läuft auf http://localhost:${PORT}`);
  // Wenn der Server läuft, gibt der Code diese Nachricht in der Konsole aus, damit du weißt, dass der Server gestartet wurde.
});
