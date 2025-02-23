const db = require("../utils/db");

class Carrello {
  static create(idUtente, numeroOrdine, note) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO CARRELLO (NUMERO_ORDINE, NOTE, ID_UTENTE) VALUES (?, ?, ?)",
        [numeroOrdine, note, idUtente],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  }
}

module.exports = Carrello;
