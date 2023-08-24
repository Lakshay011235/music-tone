import React, { useState } from 'react'
import * as Tone from 'tone';


function Player( { song }) {
  const [synth, setSynth] = useState(null);
  const [playerActive, setPlayerActive] = useState(false);
  const initializeSynth = () => {
    const newSynth = new Tone.PolySynth().toDestination();
    // const env = new Tone.Envelope({
    //   attack: 0.05,   // Short attack for a sharp pluck
    //   decay: 0.1,     // Short decay for a quick initial decay
    //   sustain: 0.3,   // Sustain level for the body of the sound
    //   release: 1.5,
    // });
    // env.connect(newSynth.volume);
    setSynth(newSynth);
  };

  const playNote = (note) => {
    const now = Tone.now();
    if (synth) {
      console.log(note);
      synth.triggerAttackRelease(note, '4n', now);
    }
  };

  const startPlayer = () => {
    if (!playerActive)
      playSongWithDelay();
  };

  const playRow = async (row) => {
    let column = [];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      let value = row[columnIndex];
      if (value !== '-') {
        column.push(await calcNote(columnIndex, value));
      }
    }
    playNote(column);
    await new Promise((resolve) => setTimeout(resolve, Tone.Time('4n').toMilliseconds()));
  };

  const playSongWithDelay = async () => {
    setPlayerActive(true);
    for (let rowIndex = 0; rowIndex < song.length; rowIndex++) {
      const row = song[rowIndex];
      await playRow(row);
    }
    await setPlayerActive(true);
  };
  /**
   * Returns the Note corresponding to the string and fret number
  *  @param {Number} stringIndex - E4 => 0, B3=>1, G3=>2, D3=>3, A2=>4, E2=>5
  *  @param {Number} fretIndex - default => 0 (open note), 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 
  *
  *  @returns {String|null|Error} Note - eg."E4" or "D#3" | Error = Invalid note Index value
  */
  const calcNote = async(stringIndex, fretIndex) => {
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
        else if (fretIndex === -1) {
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

  
  return (
    <div>
      <div>
        <button onClick={initializeSynth} disabled={synth !== null}>
          Initialize Synth
        </button>
        <button onClick={startPlayer}>
          Start Playing
        </button>
      </div>
      {/* <div>
      {song.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((value, columnIndex) => (
            <span key={columnIndex} className="cell">
              {value}
            </span>
          ))}
        </div>
      ))}
    </div> */}
    </div>
  )
}

export default Player
