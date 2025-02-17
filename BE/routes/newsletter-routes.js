const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const newsletterController = require('../controllers/newsletter-controller');

router.post('/iscrizione-newsletter', newsletterController.newsletter);
router.get('/invio-newsletter', newsletterController.invio);

module.exports = router;
