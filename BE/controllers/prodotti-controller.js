const Prodotti = require("../models/prodotti-model.js");

exports.getAll = (req, res) => {
  Prodotti.getAllProducts()
    .then(rows => {
      res.status(200).json(
        rows.map(row => ({
          ...row,
          IMMAGINE: `http://localhost:4000/file/${row.IMMAGINE}`
        }))
      );
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};
