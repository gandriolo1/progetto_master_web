const nodemailer = require("nodemailer");

require("dotenv").config();

exports.request = (req, res) => {
  console.log("*** Invio Email per contatti ***");
  let { nomeUtente, emailUtente, messaggioUtente } = req.body;
  let transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  let payload = {
    from: emailUtente,
    to: "langolodirita@gmail.com",
    subject: `Richiesta di info da parte dell'utente: ${nomeUtente}`,    
    text: messaggioUtente,
  };
  transporter.sendMail(payload, (error, info) => {
    if (error) {
      console.error("Errore durante l'invio dell'email:", error);
      return res.status(500).send("Errore durante il recupero delle email");
    } else {
      console.log("Email inviata");
      return res.status(201).send("Richiesta inviata con successo");
    }
  });
};
