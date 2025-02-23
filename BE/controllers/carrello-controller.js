const nodemailer = require("nodemailer");
const Carrello = require("../models/carrello-model.js");
require("dotenv").config();

exports.checkout = (req, res) => {
  console.log("*** Invio Email Checkout ***");
  let { idUtente, nomeUtente, emailUtente, indirizzoUtente, note } = req.body;
  let numeroOrdine = `${idUtente}${nomeUtente.charAt(0)}${Date.now()}`;
  Carrello.create(idUtente, numeroOrdine, note)
    .then((carrello) => {
      console.log(carrello.ID);
      let transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        },
      });
      let payload = {
        from: "langolodirita@gmail.com",
        to: emailUtente,
        subject: "[NO-REPLY] presa in carico ordine",
        text: `Ciao ${nomeUtente},\nil tuo ordine n°${numeroOrdine} è stato preso in carico.\nVerrà consegnato in 3-5 giorni lavorativi all'indirizzo da te inserito.\nGrazie per aver supportato il nostro store.`,
      };
      transporter.sendMail(payload, (error, info) => {
        if (error) {
          console.error("Errore durante l'invio dell'email:", error);
          return res.status(500).send("Errore durante il recupero delle email");
        } else {
          console.log("Email inviata");
          return res.status(201).send("Ordine inviato con successo");
        }
      });
    })
    .catch((error) => {
      console.error("Errore nella creazione del carrello:", error);
      return res.status(500).send(error.message);
    });
};
