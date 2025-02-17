const db = require('../utils/db');

class Newsletter {

  static create(data) {
      return new Promise((resolve, reject) => {
        let { email } = data;
        db.run('INSERT INTO NEWSLETTER (EMAIL) VALUES (?)',
          [email], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, ...data });
          }
        });
      });
    }

  static getAllRegisteredEmail() {
    return new Promise((resolve, reject) => {
      db.all('SELECT EMAIL FROM NEWSLETTER', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

}

module.exports = Newsletter;
