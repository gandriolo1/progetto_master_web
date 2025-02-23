const express = require("express");
const router = express.Router();

const carrelloController = require("../controllers/carrello-controller");

router.post("/checkout", carrelloController.checkout);

module.exports = router;
