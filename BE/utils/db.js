const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Percorso del database
const dbPath = path.resolve(__dirname, '../../DB/dev.db');

// Crea o apre un database SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Errore di connessione al database:', err.message);
  } else {
    console.log('Connesso al database SQLite');
  }
});

module.exports = db;