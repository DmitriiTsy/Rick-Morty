import './App.css';
import React, { useState } from 'react';
import BackgroundImage from './content/images/background-image.jpg';
import BigImage from './content/images/big-image.png';
import Characters from './components/Characters/Characters';

function App() {
  const [activeCharacters, setActiveCharacters] = useState(false);
  const [activeLocations, setActiveLocations] = useState(false);
  const [activeEpisodes, setActiveEpisodes] = useState(false);

  const handlerOpenCharacters = (event) => {
    event.preventDefault();
    return activeCharacters === false ? setActiveCharacters(true) : setActiveCharacters(false);
  };

  return (
    <div className="main-container">
      <img src={BigImage} srcSet={`${BigImage} 300w, ${BackgroundImage} 1280w`} className="background-image" alt="background" />
      <div className="group-buttons">
        <button onClick={handlerOpenCharacters} className={`characters-button ${activeCharacters && 'characters-button__selected'}`}>CHARACTERS</button>
        <button className={`characters-button ${activeLocations && 'characters-button__selected'}`}>LOCATIONS</button>
        <button className={`characters-button ${activeEpisodes && 'characters-button__selected'}`}>EPISODES</button>
      </div>
      {activeCharacters && <Characters />}
    </div>
  );
}

export default App;
