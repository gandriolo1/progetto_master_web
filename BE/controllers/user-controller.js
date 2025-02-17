const User = require("../models/user-model.js");

exports.signup = (req, res) => {
  const newUser = req.body;
  User.create(newUser).then(user => {
    console.log(user.nome);
    res.status(201).json({
      messaggio: "Registrazione effettuata con successo",
      userData: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });
  }).catch(error => {
    res.status(500).send(error.message);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email).then(user => {
    if (user.EMAIL === email && user.PASSWORD === password) {
      res.status(201).json({
        messaggio: "Login effettuato con successo",
        userData: {
          id: user.ID,
          nome: user.NOME,
          email: user.EMAIL
        }
      });
    } else {
      res.status(401).send("Credenziali non valide");
    }
  }).catch(error => {
    res.status(500).send(error.message);
  });
};
