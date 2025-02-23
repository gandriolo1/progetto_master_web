const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlist-controller.js");

router.get("/listaPreferiti", wishlistController.getWishlist);
router.post("/aggiungiPreferito", wishlistController.createWish);
router.delete("/rimuoviPreferito", wishlistController.deleteWish);

module.exports = router;
