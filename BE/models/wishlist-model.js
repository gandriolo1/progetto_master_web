const db = require("../utils/db");

class Whishlist {
  static createWish(idUtente, idProdotto) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO WISHLIST (ID_PRODOTTO, ID_UTENTE) VALUES (?, ?)",
        [idProdotto, idUtente],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAllWish(idUtente) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT w.ID, p.ID, p.NOME, p.IMMAGINE, p.PREZZO FROM WISHLIST w JOIN UTENTI u ON u.ID = w.ID_UTENTE JOIN PRODOTTI p ON p.ID = w.ID_PRODOTTO WHERE w.ID_UTENTE = ?",
        [idUtente],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static removeWish(idUtente, idProdotto) {
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM WISHLIST WHERE ID_UTENTE = ? AND ID_PRODOTTO = ?",
        [idUtente, idProdotto],
        function (err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            reject(new Error("Prodotto non trovato nella wishlist"));
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = Whishlist;
