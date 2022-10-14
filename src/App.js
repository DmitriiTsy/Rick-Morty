
import './App.css';
import BackgroundImage from './content/images/background-image.jpg'
import BigImage from '../src/content/images/big-image.png'
import React, {useState} from 'react'
import Characters from '../src/components/Characters/Characters.js';
import './App.css'

function App() {
  const [activeCharacters, setActiveCharacters] = useState(false)
  const [activeLocations, setActiveLocations] = useState(false)
  const [activeEpisodes, setActiveEpisodes] = useState(false)

  const HandlerCharacters = (event) => {
    event.preventDefault();
    return activeCharacters === false? setActiveCharacters(true): setActiveCharacters(false)
  }

  return (
      <div className='main-container'>
         <img src={BigImage} srcSet={`${BigImage} 300w, ${BackgroundImage} 1280w`} className="background-image"></img>
         <div className='Group-buttons'>
            <button onClick={HandlerCharacters} style={activeCharacters === true? {borderBottom: '2px solid orange'} : {border: 'none'}} className='characters-button'>CHARACTERS</button>
            <button className='characters-button' style={activeLocations === true? {borderBottom: '2px solid orange'} : {border: 'none'}}>LOCATIONS</button>
            <button className='characters-button' style={activeEpisodes === true? {borderBottom: '2px solid orange'} : {border: 'none'}}>EPISODES</button>
        </div>
          {activeCharacters && <Characters/>}
      </div>
  )
  
}

export default App;
