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

exports.checkout = (req, res) => {
    console.log("*** Invio Email Checkout ***");
    let { nomeUtente, emailUtente, indirizzoUtente, note } = req.body;
    let payload = {
        from: 'langolodirita@gmail.com',
        to: emailUtente,
        subject: '[NO-REPLY] presa in carico ordine]',
        text: `Ciao ${nomeUtente}, \n il tuo ordine è stato preso in carico. Verrà consegnato in 3-5 giorni lavorativi all'indirizzo ${indirizzoUtente}`,
    };

    // Invio dell'email
    transporter.sendMail(payload, (error, info) => {
        if (error) {
            console.error('Errore durante l\'invio dell\'email:', error);
            res.status(500).send('Errore durante il recupero delle email');
        } else {
            console.log('Email inviata');
            res.status(201).send('Email inviate con successo');
        }
    });
};
