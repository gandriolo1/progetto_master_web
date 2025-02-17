const Newsletter = require("../models/newsletter-model.js");
const User = require("../models/user-model.js");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

exports.newsletter = (req, res) => {
    const emailNews = req.body;
    Newsletter.createNewsletter(emailNews);
    res.status(201).send("Iscrizione alla newsletter avvenuta con successo");
};

exports.invio = (req, res) => {
    console.log("*** Invio Email Manuale ***");
  
    let emailListUser = [];
    let emailListNews = [];
  
    Promise.all([
      User.getAllRegisteredEmail(),
      Newsletter.getAllRegisteredEmail()
    ]).then(([resultUser, resultNews]) => {

        // Estrazione delle email
        emailListUser = resultUser.map(row => row.EMAIL);
        emailListNews = resultNews.map(row => row.EMAIL);

        let emailList = [...new Set([...emailListUser, ...emailListNews])];
  
        // Invio dell'email a ciascun destinatario
        emailList.forEach(email => {
          // Costruzione della mail
          const payload = {
            from: 'langolodirita@gmail.com',
            to: email,
            subject: 'Nuova promozione',
            text: 'Ciao ecco il tuo messaggio personalizzato!',
          };
  
          // Invio dell'email
          transporter.sendMail(payload, (error, info) => {
            if (error) {
              console.error('Errore durante l\'invio dell\'email:', error);
            } else {
              console.log('Email inviata a:', email, 'Info:', info.response);
            }
          });
        });
  
        res.status(201).send('Email inviate con successo');
      })
      .catch(error => {
        console.error('Errore nel recupero delle email:', error);
        res.status(500).send('Errore durante il recupero delle email');
      });
};
