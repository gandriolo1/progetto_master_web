const db = require('../utils/db');

class Prodotti {

  // READ ALL
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM PRODOTTI', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }  

}

module.exports = Prodotti;
