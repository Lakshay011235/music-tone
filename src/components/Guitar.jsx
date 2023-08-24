import React, { useState } from 'react'
import * as Tone from 'tone';
import '../styles/guitar.css';
import GuitarTable from './GuitarTable';

function Guitar() {
  const [synth, setSynth] = useState(null);
  const [synthActive, setSynthActive] = useState(false);

  const initializeSynth = () => {
    if (!synthActive){
      const newSynth = new Tone.Synth();
      // const env = new Tone.Envelope({
      //   attack: 0.05,   
      //   decay: 0.1,     
      //   sustain: 0.3, 
      //   release: 1.5,
      // });
      // env.connect(newSynth.volume);
      newSynth.toDestination();
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
