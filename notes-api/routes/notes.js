// routes/notes.js
const express = require('express');
const sqlite3 = require('sqlite3');

const router = express.Router();
const db = new sqlite3.Database('notes.db');

// Route to get notes data
router.get('/api/notes', (req, res) => {
  db.all('SELECT * FROM notes', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve notes' });
    }

    const notesData = rows.map((row) => JSON.parse(row.data));
    res.json(notesData);
  });
});

module.exports = router;
