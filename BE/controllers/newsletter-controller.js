const Newsletter = require("../models/newsletter-model.js");
const User = require("../models/user-model.js");
const nodemailer = require("nodemailer");

require("dotenv").config();

exports.newsletter = (req, res) => {
  const emailNews = req.body;
  Newsletter.create(emailNews);
  res.status(201).send("Iscrizione alla newsletter avvenuta con successo");
};

exports.invio = (req, res) => {
  console.log("*** Invio Email Manuale ***");
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
  let emailListUser = [];
  let emailListNews = [];
  Promise.all([
    User.getAllRegisteredEmail(),
    Newsletter.getAllRegisteredEmail(),
  ])
    .then(([resultUser, resultNews]) => {
      emailListUser = resultUser.map((row) => row.EMAIL);
      emailListNews = resultNews.map((row) => row.EMAIL);
      let emailList = [...new Set([...emailListUser, ...emailListNews])];
      emailList.forEach((email) => {
        const payload = {
          from: "langolodirita@gmail.com",
          to: email,
          subject: "Nuova promozione",
          text: "Ciao ecco il tuo messaggio personalizzato!",
        };
        transporter.sendMail(payload, (error, info) => {
          if (error) {
            console.error("Errore durante l'invio dell'email:", error);
          } else {
            console.log("Email inviata a:", email, "Info:", info.response);
          }
        });
      });
      res.status(201).send("Email inviate con successo");
    })
    .catch((error) => {
      console.error("Errore nel recupero delle email:", error);
      res.status(500).send("Errore durante il recupero delle email");
    });
};
