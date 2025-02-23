function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("http://localhost:4000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      const data = JSON.parse(text);
      localStorage.setItem("user", JSON.stringify(data.userData));
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Errore nel login: ", error);
      alert("Credenziali non valide");
      return;
    });
}
