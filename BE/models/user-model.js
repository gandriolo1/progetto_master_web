const db = require("../utils/db");

class User {

  static create(data) {
    return new Promise((resolve, reject) => {
      let { nome, cognome, email, password } = data;
      db.get("SELECT * FROM UTENTI WHERE EMAIL = ?", [email], (err, row) => {
        if (err) {
          return reject(
            new Error("Errore nel controllo dell'email: " + err.message)
          );
        }
        if (row) {
          return reject(new Error("Email già in uso"));
        }
        db.run(
          "INSERT INTO UTENTI (NOME, COGNOME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)",
          [nome, cognome, email, password],
          function (err) {
            if (err) {
              return reject(
                new Error("Errore nell'inserimento: " + err.message)
              );
            }
            resolve({ id: this.lastID, nome, email });
          }
        );
      });
    });
  }

  static update(email, password) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE UTENTI SET EMAIL = ?, PASSWORD = ? WHERE EMAIL = ?", 
        [email, password, email],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        }
      );
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM UTENTI WHERE EMAIL = ?", [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static getAllRegisteredEmail() {
    return new Promise((resolve, reject) => {
      db.all("SELECT EMAIL FROM UTENTI", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = User;
