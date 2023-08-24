import React, { useState } from 'react'
import '../styles/notes.css'

/**
 * Represents a note column containing note values.
 */
class NoteColumn {
  /**
   * Create a new NoteColumn instance.
   * @param {string} value1 - Value for the first note.
   * @param {string} value2 - Value for the second note.
   * @param {string} value3 - Value for the third note.
   * @param {string} value4 - Value for the fourth note.
   * @param {string} value5 - Value for the fifth note.
   * @param {string} value6 - Value for the sixth note.
   */
  constructor(value1, value2, value3, value4, value5, value6) {
    this.values = [value1, value2, value3, value4, value5, value6];
  }
}

/**
 * A React component for managing and displaying musical notes.
 * @returns {JSX.Element} The Notes component.
 */
function Notes() {
  const [songName, setSongName] = useState("");
  const [notes, setNotes] = useState([new NoteColumn('-', '-', '-', '-', '-', '-')]);
  const [writable, setWritable] = useState(0);

  /**
   * Add a new note column to the notes.
   */
  const addNoteColumn = () => {
    setNotes([...notes, new NoteColumn('-', '-', '-', '-', '-', '-')]);
  };

  /**
   * Update the value of a note in the notes.
   * @param {number} columnIndex - Index of the note column.
   * @param {number} rowIndex - Index of the note within the column.
   * @param {string} newValue - New value for the note.
   */
  const updateNoteValue = (columnIndex, rowIndex, newValue) => {
    const newNotes = [...notes];
    if ((parseInt(newValue) >= 0 && parseInt(newValue) <= 12) || newValue === '-') {
      newNotes[columnIndex].values[rowIndex] = newValue;
      setNotes(newNotes);
    }
  };

  /**
   * Handle key down events to prevent non-numeric input.
   * @param {Event} e - The key down event.
   */
  const handleKeyDown = (e) => {
    var key = e.key;
    var regex = /[0-9]/;
    if (!regex.test(key)) {
      e.preventDefault();
    }
  };

  /**
   * Render the musical notes.
   * @returns {JSX.Element[]} Array of JSX elements representing note columns.
   */
  const renderNotes = () => {
    return notes.map((noteColumn, columnIndex) => (
      <div key={columnIndex} className="noteColumn">
        {noteColumn.values.map((value, rowIndex) => (
          <span key={rowIndex} className="note">
            {value}
          </span>
        ))}
      </div>
    ));
  };

  /**
   * Save the notes to the API.
   */
  const saveNotesToAPI = () => {
    const notesData = notes.map((noteColumn) => noteColumn.values);

    fetch('http://localhost:3001/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes: notesData, songName: songName.toLowerCase() }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Sent")
        console.log(data.message);
      })
      .catch((error) => {
        console.error('Error saving notes:', error);
      });
  };

  return (
    <div>
      <div>
        <input 
          type="text"  
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder='Enter song name'
        />
      </div>
      <div className="notes">
        {notes.map((noteColumn, columnIndex) => (
          <div key={columnIndex} className='noteColumn'>
            {noteColumn.values.map((value, rowIndex) => (
              <input
                className='note'
                key={rowIndex}
                value={value}
                min={0}
                max={12}
                onChange={(e) =>
                  updateNoteValue(columnIndex, rowIndex, parseInt(e.target.value))
                }
                onClick={() => {
                  updateNoteValue(columnIndex, rowIndex, writable);
                  setWritable((writable + 1));
                }}
                onMouseLeave={() => {setWritable(0);}}
                onContextMenu={(e) => {
                  e.preventDefault();
                  updateNoteValue(columnIndex, rowIndex, '-');
                }}
                // onMouseOver={() => console.log(notes[columnIndex].values[rowIndex])}
                onKeyDown={(e) => {
                  if (writable > 0) updateNoteValue(columnIndex, rowIndex, '');
                  handleKeyDown(e);
                  setWritable(false);
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={addNoteColumn}>Add Column</button>
        <button type="button" onClick={saveNotesToAPI}>Save</button>
      </div>
      <div className="notes">
        {renderNotes()}
      </div>
    </div>
  )
}

export default Notes;
