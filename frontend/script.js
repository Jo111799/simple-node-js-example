// Nachricht vom Server holen (GET)
fetch("http://localhost:3000/api/message")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("message").innerHTML = data.message;
  })
  .catch(() => {
    document.getElementById("message").innerHTML = "Fehler beim Laden der Nachricht!";
  });

// Formular absenden und POST-Request senden
document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;

  // Beispiel: Query-Parameter anhängen (z.B. ?lang=de)
  const queryParams = new URLSearchParams({ lang: "de" });

  fetch(`http://localhost:3000/api/greet?${queryParams.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }), // Body mit dem Namen
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("response").innerHTML = data.greeting;
    })
    .catch(() => {
      document.getElementById("response").innerHTML = "Fehler beim Senden der Anfrage!";
    });
});
