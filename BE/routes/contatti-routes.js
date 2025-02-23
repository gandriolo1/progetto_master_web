const express = require("express");
const router = express.Router();

const contattiController = require("../controllers/contatti-controller");

router.post("/request", contattiController.request);

module.exports = router;
