import React, { useEffect, useState } from 'react';
import '../styles/notes.css';
import Player from './Player';

/**
 * A React component for fetching and displaying notes based on song name.
 * @returns {JSX.Element} The FetchNotes component.
 */
function FetchNotes() {
  const [notes, setNotes] = useState([]);
  const [inputSongName, setInputSongName] = useState('');
  const [error, setError] = useState('');
  const [notesCount, setNotesCount] = useState(0);
  /**
   * Fetches notes based on the input song name.
   */
  const getNotes = () => {
    setError(''); // Clear any previous errors
    fetch(`http://localhost:3001/api/notes/${inputSongName.toLowerCase()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (Array.isArray(data)) {
              setNotes(data);
            } else {
              setNotes([data]); // Wrap object in an array
            }
          });
        } else if (response.status === 404) {
          setError('Song not found');
          setNotes([]); // Clear notes
        } else {
          throw new Error('Error fetching notes');
        }
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  };

  /**
   * Renders the fetched notes or an error message.
   * @returns {JSX.Element[]} An array of JSX elements representing notes.
   */
  const renderNotes = () => {
    if (error) {
      return <div className="error">{error}</div>;
    }

    return notes.map((note, noteIndex) => (
      <div key={noteIndex} className="notes">
        <h3>Song Name: {note.songName}</h3>
        {note.data.map((noteColumn, columnIndex) => (
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

  useEffect(()=>{
    console.log(notes);
  },[notes]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputSongName}
          onChange={(e) => {
            setInputSongName(e.target.value);
          }}
          placeholder="Enter song name"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            getNotes();
          }}
          // Fuzzy logic But it works
          onMouseLeave={() => setNotesCount(notes.length)}
        >
          Fetch Notes
        </button>
      </div>
      <div className="noteColumn">{renderNotes()}</div>
      {/* <p>{notes.map((note, noteIndex) => (
        <span key={noteIndex} className="note">
          {note.data}
        </span>
      ))}</p> */}
      {/* {firstElement?.data} */}
      <Player song={notes[0]?.data} />
      {/* {showPlayer ? notes.map((note, noteIndex) => {console.log(note, noteIndex)}) : ""} */}
    </div>
  );
}

export default FetchNotes;
