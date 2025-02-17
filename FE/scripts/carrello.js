function checkout() {
  let utente = JSON.parse(localStorage.getItem("user"));
  let emailUtente = utente ? utente.email : null;
  let nomeUtente = document.getElementById('name').value;
  let indirizzoUtente = document.getElementById('address').value;
  let note = document.getElementById('notes').value;
  fetch('http://localhost:4000/carrello/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nomeUtente, emailUtente, indirizzoUtente, note })
  })
}
