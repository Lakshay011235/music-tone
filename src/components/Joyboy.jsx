import React, { useState } from 'react'

function Joyboy() {

  /**
   * Returns the Note corresponding to the string and fret number
  *  @param {Number} stringIndex - E4 => 0, B3=>1, G3=>2, D3=>3, A2=>4, E2=>5
  *  @param {Number} fretIndex - default => 0 (open note), 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 
  *
  *  @returns {String|null|Error} Note - eg."E4" or "D#3" | Error = Invalid note Index value
  */
  const calcNote = (stringIndex, fretIndex) => {
    const strings = [
      'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5',
      'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
      'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4',
      'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4',
      'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3',
      'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3',
    ];
    stringIndex = Math.floor(stringIndex);
    fretIndex = Math.floor(fretIndex);
    try {
      if (stringIndex >= 0 && stringIndex <=5) {
        if (fretIndex >= 0 && fretIndex <= 12) {
          let noteIndex = stringIndex*13 + fretIndex;
          return strings[noteIndex];
        }
        else if (fretIndex == -1) {
          return null
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


  const [stringIndex, setStringIndex] = useState(0);
  const [fretIndex, setFretIndex] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const showNote = () => {
    setNoteIndex(calcNote(stringIndex, fretIndex));
  };
  return (
    <div>
      <form>
        <input type='number' name='String' value={stringIndex} onChange={(e) => {setStringIndex(e.target.value)}}></input>
        <input type='number' name='Fret' value={fretIndex} onChange={(e) => {setFretIndex(e.target.value)}}></input>
      </form>
      <div>
        <button onClick={showNote}>Press me</button>
      </div>
      
      <div>{noteIndex}</div>
    </div>
  )
}

export default Joyboy
