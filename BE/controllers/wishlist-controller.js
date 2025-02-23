const Wishlist = require("../models/wishlist-model.js");

exports.createWish = (req, res) => {
  let { idUtente, idProdotto } = req.body;
  if (!idUtente || !idProdotto) {
    return res.status(400).json({ errore: "ID utente e ID prodotto mancanti" });
  }
  Wishlist.createWish(idUtente, idProdotto)
    .then((whish) => {
      res
        .status(200)
        .json({ messaggio: "Prodotto aggiunto alla Whishlist", whish: whish });
    })
    .catch((err) => {
      res.status(500).json({ errore: err.message });
    });
};

exports.getWishlist = (req, res) => {
  let idUtente = req.query.id;
  if (!idUtente) {
    return res.status(400).json({ error: "ID utente mancante" });
  }
  Wishlist.getAllWish(idUtente)
    .then((rows) => {
      res
        .status(200)
        .json(
          rows.map((row) => ({
            ...row,
            IMMAGINE: `http://localhost:4000/file/${row.IMMAGINE}`,
          }))
        );
    })
    .catch((err) => {
      res.status(500).json({ errore: err.message });
    });
};

exports.deleteWish = (req, res) => {
  let idUtente = req.query.id;
  let idProdotto = req.query.productId;
  if (!idUtente || !idProdotto) {
    return res.status(400).json({ error: "ID utente e ID prodotto mancanti" });
  }
  Wishlist.removeWish(idUtente, idProdotto)
    .then((updatedWishlist) => {
      res.status(200).json(updatedWishlist);
    })
    .catch((err) => {
      res.status(500).json({ errore: err.message });
    });
};
