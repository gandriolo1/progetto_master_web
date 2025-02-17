function signupUser() {
    let nome = document.getElementById('nome').value;
    let cognome = document.getElementById('cognome').value;
    let domicilio = document.getElementById('domicilio').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    fetch('http://localhost:4000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
       },
        body: JSON.stringify({ nome, cognome, domicilio, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.userData) {
            localStorage.setItem('user', JSON.stringify(data.userData));
            alert('Registrazione completata con successo!');
            window.location.href = '/';
        }
    })
    .catch(error => {
      console.error('Errore nella registrazione:', error);
    });
}
