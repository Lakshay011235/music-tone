const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notes'); // Import the notes route


const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(notesRoutes);

// Initialize SQLite database
const db = new sqlite3.Database('notes.db');

// Create a table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY,
    songName TEXT,
    data TEXT
  )
`);

// Route to save notes
app.post('/api/notes', async (req, res) => {
  const notes = req.body.notes;
  const songName = req.body.songName;
  db.run(
    'INSERT INTO notes (songName, data) VALUES (?, ?)',
    [songName, JSON.stringify(notes)],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to save notes' });
      }

      res.status(201).json({ message: 'Notes saved successfully' });
    }
  );
});
 
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
