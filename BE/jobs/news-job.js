const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require("../models/user-model.js");
const Newsletter = require("../models/newsletter-model.js");

require('dotenv').config();

cron.schedule('0 10 * * 1', () => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
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
    Newsletter.getAllRegisteredEmail()
  ]).then(([resultUser, resultNews]) => {
      emailListUser = resultUser.map(row => row.EMAIL);
      emailListNews = resultNews.map(row => row.EMAIL);
      let emailList = [...new Set([...emailListUser, ...emailListNews])];
      emailList.forEach(email => {
        const payload = {
          from: 'langolodirita@gmail.com',
          to: email,
          subject: process.env.MAIL_OBJ,
          text: process.env.MAIL_TEXT,
        };
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
  console.log('Invio automatico completato!');
});
