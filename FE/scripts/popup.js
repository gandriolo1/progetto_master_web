function openPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
  }


function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Da terminare
async function sendEmail() {
  const email = document.getElementById("emailInput").value;
  try {
    const response = await fetch('#', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    closePopup();
  } catch (error) {
    alert("Si è verificato un errore: " + error.message);
  }
}
