import React, { useState } from 'react'
import * as Tone from 'tone';
import '../styles/guitar.css';
import GuitarTable from './GuitarTable';

function Guitar() {
  const [synth, setSynth] = useState(null);
  const [synthActive, setSynthActive] = useState(false);

  const initializeSynth = () => {
    if (!synthActive){
      const newSynth = new Tone.Synth().toDestination();
      setSynth(newSynth);
      // alert("Synth is now active");
      console.log("Synth is now active");
      setSynthActive(true);
    }
  };
  return (
    <div>
      <div className="initialize-synth"
        onClick={() => initializeSynth()}>
        Initialize Synth
      </div>
      <GuitarTable synth={synth}/>
    </div>    
  )
}

export default Guitar;
