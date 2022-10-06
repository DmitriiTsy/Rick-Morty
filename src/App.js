
import './App.css';
import BackgroundImage from '/Users/dmitry/Desktop/Rick-Morty/rick-morty/src/content/images/background-image.jpg'
import React, {useState} from 'react'
import Characters from '../src/components/Characters/Characters.js';
import './App.css'

function App() {
  const [activeCharacters, setActiveCharacters] = useState(false)

  const HandlerCharacters = (event) => {
    event.preventDefault();
    return activeCharacters === false? setActiveCharacters(true): setActiveCharacters(false)
  }

  return (
      <div>
         <img src={BackgroundImage} className="background-image"></img>
         <div className='Group-buttons'>
          <button onClick={HandlerCharacters} className='characters-button'>CHARACTERS</button>
          <button className='characters-button'>LOCATIONS</button>
          <button className='characters-button'>EPISODES</button>
        </div>
          {activeCharacters && <Characters/>}
      </div>
  )
  
}

export default App;
