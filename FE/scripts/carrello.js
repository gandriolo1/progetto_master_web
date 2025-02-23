function checkout() {
  let utente = JSON.parse(localStorage.getItem("user"));
  let emailUtente = utente ? utente.email : null;
  let idUtente = utente ? utente.id : null;
  let nomeUtente = document.getElementById("name").value;
  let indirizzoUtente = document.getElementById("address").value;
  let note = document.getElementById("notes").value;

  fetch("http://localhost:4000/carrello/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUtente,
      nomeUtente,
      emailUtente,
      indirizzoUtente,
      note
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Errore durante l'invio dell'ordine");
    }
    return response.text();
  })
  .then(message => {
    alert(message);
    window.location.href = "/";
  })
  .catch(error => {
    alert("Si è verificato un errore: " + error.message);
  });
}
