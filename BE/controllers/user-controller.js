const User = require("../models/user-model.js");
const nodemailer = require("nodemailer");

require("dotenv").config();

exports.signup = (req, res) => {
  const newUser = req.body;
  User.create(newUser)
    .then((user) => {
      console.log(user.nome);
      res.status(201).json({
        messaggio: "Registrazione effettuata con successo",
        userData: {
          id: user.id,
          nome: user.nome,
          email: user.email,
        },
      });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email)
    .then((user) => {
      if (user.EMAIL === email && user.PASSWORD === password) {
        res.status(201).json({
          messaggio: "Login effettuato con successo",
          userData: {
            id: user.ID,
            nome: user.NOME,
            email: user.EMAIL,
          },
        });
      } else {
        res.status(401).send("Credenziali non valide");
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

exports.reset = (req, res) => {
  const { email } = req.body;
  User.findByEmail(email)
    .then((user) => {
      if (user.EMAIL === email) {
        var randomPass = Math.random().toString(36).slice(-8);
        User.update(email, randomPass)
          .then(() => {
            var transporter = nodemailer.createTransport({
              service: process.env.MAIL_SERVICE,
              host: process.env.MAIL_HOST,
              port: Number(process.env.MAIL_PORT),
              secure: true,
              auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
              },
            });
            const payload = {
              from: "langolodirita@gmail.com",
              to: email,
              subject: "Cambio password",
              text: `Ciao ecco la tua nuova password temporanea ${randomPass}. Se vuoi cambiare la tua password con una custom contattare l'admin del sito.`,
            };
            transporter.sendMail(payload, (error, info) => {
              if (error) {
                console.error("Errore durante l'invio dell'email:", error);
                res.status(500).send("Errore durante l'invio dell'email");
              } else {
                console.log("Email inviata a:", email, "Info:", info.response);
                res.status(201).send("Email inviata con successo");
              }
            });
          })
          .catch((error) => {
            console.error(
              "Errore durante l'aggiornamento della password:",
              error
            );
            res
              .status(500)
              .send("Errore durante l'aggiornamento della password");
          });
      } else {
        res.status(401).send("Nessun utente trovato");
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};
