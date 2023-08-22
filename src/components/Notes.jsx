import React, { useState } from 'react'
import '../styles/notes.css'

class NoteColumn {
  constructor(value1, value2, value3, value4, value5, value6) {
    this.values = [value1, value2, value3, value4, value5, value6];
  }
}

function Notes() {
  const [notes, setNotes] = useState([new NoteColumn('-', '-', '-', '-', '-', '-')]);
  const [writable, setWritable] = useState(0);
  const addNoteColumn = () => {
    setNotes([...notes, new NoteColumn('-', '-', '-', '-', '-', '-')]);
  };
  const updateNoteValue = (columnIndex, rowIndex, newValue) => {
    const newNotes = [...notes];
    if ((parseInt(newValue) >= 0 && parseInt(newValue) <= 12) || newValue === '-')
      newNotes[columnIndex].values[rowIndex] = newValue;
    setNotes(newNotes);
  };
  const handleKeyDown = (e) => {
    var key = e.key;
        var regex = /[0-9]/;
        if( !regex.test(key) ) {
            e.preventDefault();
        }
        else {}
  };

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

  const saveNotesToAPI = () => {
    const notesData = notes.map((noteColumn) => noteColumn.values);
  
    fetch('http://localhost:3001/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: notesData }),
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
                  updateNoteValue(columnIndex, rowIndex, writable);s
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
      <div className="notes">{renderNotes()}</div>
    </div>
  )
}

export default Notes
