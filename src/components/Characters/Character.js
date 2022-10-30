/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Character.css';

function Character({ props, index }) {
  const {
    image, name, status, species, gender, episode,
  } = props;

  const [touchImage, setTouchImage] = useState(false);

  const handlerTouch = (event) => {
    event.preventDefault();
    return touchImage === false ? setTouchImage(true) : setTouchImage(false);
  };

  const episodes = episode.length;
  return (
    <div className="character-wrapper">
      <div className="character-wrapper__images">
        <img src={image} onClick={handlerTouch} className="character__image" alt="character-portrait" />
      </div>
      {touchImage
            && (
            <div className="character-wrapper__text">
              <div key={index} className="character-wrapper__name">{name}</div>
              <div className="character-wrapper__species-block">
                <div>
                  {species}
                </div>
                <div className="character-wrapper__species-wrapper">
                  <div className={`character-wrapper__indicator ${status === 'Alive' && 'character-wrapper__indicator-selected'}`} />
                  <div>
                    (
                    {status}
                    )
                  </div>
                </div>
              </div>
              <div className="character-wrapper-gender">
                <div className="character-wrapper-gender__text">Gender: </div>
                {gender}
              </div>
              <div className="character-wrapper-seen">
                <div className="character-wrapper-seen__text">First seen in: </div>
                {props.origin.name}
              </div>
              <div className="character-wrapper-location">
                <div className="character-wrapper-location__text">Last known location: </div>
                {props.location.name}
              </div>
              <div className="character-wrapper-episodes">
                <div className="character-wrapper-episodes__text">
                  Episodes:
                </div>
                <div>
                  {episodes}
                </div>
              </div>
            </div>
            )}
    </div>
  );
}

export default Character;
