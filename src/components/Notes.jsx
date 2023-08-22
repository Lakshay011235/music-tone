import React, { useEffect, useState } from 'react'
import '../styles/notes.css'

class NoteColumn {
  constructor(value1, value2, value3, value4, value5, value6) {
    this.values = [value1, value2, value3, value4, value5, value6];
  }
}

function Notes() {
  const [notes, setNotes] = useState([new NoteColumn('-', '-', '-', '-', '-', '-')]);
  const [writable, setWritable] = useState(false);
  const addNoteColumn = () => {
    setNotes([...notes, new NoteColumn('-', '-', '-', '-', '-', '-')]);
  };
  const updateNoteValue = (columnIndex, rowIndex, newValue) => {
    const newNotes = [...notes];
    if (parseInt(newValue) >= 0 && parseInt(newValue) <= 12)
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

  useEffect(() => {
    let asdf = JSON.stringify(notes);
    console.log(asdf);
    console.log(JSON.parse(asdf));
  });
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
                  updateNoteValue(columnIndex, rowIndex, 0);
                  setWritable(true);
                }}
                // onMouseOver={() => console.log(notes[columnIndex].values[rowIndex])}
                onKeyDown={(e) => {
                  if (writable) updateNoteValue(columnIndex, rowIndex, '');
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
      </div>
      <div className="notes">{renderNotes()}</div>
    </div>
  )
}

export default Notes
