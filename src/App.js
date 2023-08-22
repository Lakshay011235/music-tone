import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FetchNotes from './components/FetchNotes';
// import Guitar from './components/Guitar';
// import Piano from './components/Piano';
import Joyboy from './components/Joyboy';
import Notes from './components/Notes';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FetchNotes />} />
        {/* <Route exact path="/guitar" element={<Guitar />} /> */}
        {/* <Route exact path="/Piano" element={<Piano />} /> */}
        <Route exact path="/Joyboy" element={<Joyboy />} />
        <Route exact path="/notes" element={<Notes />} />
      </Routes>
    </Router> 
    // <div className="App">
    //   {/* <Piano /> */}
    //   {/* <Guitar /> */}
    //   {/* <Joyboy /> */}
    //   {/* <Notes /> */}
    //   <FetchNotes />
    // </div>
  );
}

export default App;
