const express = require('express');
const router = express.Router();

const prodottiController = require('../controllers/prodotti-controller');

router.get('/get-all', prodottiController.getAll);

module.exports = router;
