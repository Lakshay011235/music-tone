import React from 'react';
import * as Tone from 'tone';
import '../styles/guitartable.css';


const GuitarTable = ({synth}) => {
  const strings = [
    'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5',
    'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
    'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4',
    'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4',
    'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3',
    'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3',
  ];

  const handleClick = (note) => {
    if (synth !== null){
      synth.triggerAttackRelease(note, '8n');
    }
    else {
      alert("Synth is not available");
    }
  };


  /**
   * Returns the Note corresponding to the string and fret number
  *  @param {Number} stringIndex - E4 => 0, B3=>1, G3=>2, D3=>3, A2=>4, E2=>5
  *  @param {Number} fretIndex - default => 0 (open note), 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 
  *
  *  @returns {String|Error} Note - eg."E4" or "D#3" | Error = Invalid note Index value
  */
  const calcNote = (stringIndex, fretIndex) => {
    try {
      if (stringIndex >= 0 && stringIndex <=5) {
        if (fretIndex >= 0 && fretIndex <= 12) {
          let noteIndex = stringIndex*13 + fretIndex;
          return strings[noteIndex];
        }
        else {
          throw new Error("Invalid Fret Index");
        }
      }
      else {
        throw new Error("Invalid String Index");
      }
    } catch (error) {
      console.error(error);
    }
  };

  calcNote()
  return (
    <div className="guitar-table">
      {strings.map((note, index) => (
        <div
          className="string"
          key={index}
          onClick={() => handleClick(note)}
        >
          <div className="cell">
            <span className="note disable-select">{note}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuitarTable;
