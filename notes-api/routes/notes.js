const express = require('express');
const sqlite3 = require('sqlite3');

const router = express.Router();
const db = new sqlite3.Database('notes.db');

// Route to get all notes data
router.get('/api/notes', (req, res) => {
  db.all('SELECT * FROM notes', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve notes' });
    }

    const notesData = rows.map((row) => ({
      songName: row.songName,
      data: JSON.parse(row.data),
    }));
    res.json(notesData);
  });
});

// Route to get notes data for a specific song name
router.get('/api/notes/:songName', (req, res) => {
  const { songName } = req.params;

  db.get('SELECT * FROM notes WHERE songName = ?', [songName], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve notes' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Song not found' });
    }

    const notesData = {
      songName: row.songName,
      data: JSON.parse(row.data),
    };
    res.json(notesData);
  });
});

module.exports = router;
