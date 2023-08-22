import React, { useState } from 'react'
import '../styles/notes.css';
import { Link } from 'react-router-dom';

function FetchNotes() {
  const [notes, setNotes] = useState([[]]);

  const getNotes = () => {  
    fetch('http://localhost:3001/api/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setNotes(data);
        });
      })
      .catch((error) => {
        console.error('Error saving notes:', error);
      });
  };

  const renderNotes = () => {
    return notes.map((note, noteIndex) => (
      <div key={noteIndex} className="notes">
        {note.map((noteColumn, columnIndex) => (
        <div key={columnIndex} className="noteColumn">
          {noteColumn.map((value, rowIndex) => (
            <span key={rowIndex} className="note">
              {value}
            </span>
          ))}
        </div>
        ))}
      </div>
    ));
  };
  return (
    <div>
      <button onClick={getNotes}>Click Me</button>
      {/* <Link to="/joyboy" ><button>Click Me</button></Link> */}
      <div className="noteColumn">{renderNotes()}</div>
    </div>
  )
}

export default FetchNotes
