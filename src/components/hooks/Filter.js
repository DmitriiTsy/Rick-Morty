/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from 'react';
import useFilter from './useFilter';
import useLink from './useLink';

function Filter(props) {
  const { getUrlText } = props;

  const [
    handlerCurrentStatus,
    handlerCurrentSpecies,
    handlerCurrentGender,
    currentStatus,
    currentSpecies,
    currentGender,
    handlerStatus,
    handlerSpecies,
    handlerGender,
    status,
    species,
    gender,
    handlerClean,
  ] = useFilter({ props });

  const addition = useLink(
    currentGender,
    currentSpecies,
    currentStatus,
  );

  getUrlText(addition);

  return (
    <div className="filter-wrapper">
      <button onClick={handlerClean} className="filter-wrapper__text">Clear Filters</button>
      <div className="filter-buttons-wrapper">
        <button
          onClick={handlerStatus}
          className="filter-buttons-wrapper__button"
        >
          Status
        </button>
        {status
                && (
                <div className="filter-buttons-wrapper__elements">
                  <div onClick={handlerCurrentStatus} id="Alive" className={`filter-buttons-wrapper__element ${currentStatus === 'Alive' && 'filter-buttons-wrapper__selected'} `}>Alive</div>
                  <div onClick={handlerCurrentStatus} id="Dead" className={`filter-buttons-wrapper__element ${currentStatus === 'Dead' && 'filter-buttons-wrapper__selected'} `}>Dead</div>
                  <div onClick={handlerCurrentStatus} id="Unknown" className={`filter-buttons-wrapper__element ${currentStatus === 'Unknown' && 'filter-buttons-wrapper__selected'} `}>Unknown</div>
                </div>
                )}
        <button onClick={handlerGender} className="filter-buttons-wrapper__button">Gender</button>
        {gender
                && (
                <div className="filter-buttons-wrapper__elements">
                  <div onClick={handlerCurrentGender} id="Female" className={`filter-buttons-wrapper__element ${currentGender === 'Female' && 'filter-buttons-wrapper__selected'} `}>Female</div>
                  <div onClick={handlerCurrentGender} id="Male" className={`filter-buttons-wrapper__element ${currentGender === 'Male' && 'filter-buttons-wrapper__selected'} `}>Male</div>
                  <div onClick={handlerCurrentGender} id="Unknown" className={`filter-buttons-wrapper__element ${currentGender === 'Unknown' && 'filter-buttons-wrapper__selected'} `}>Unknown</div>
                  <div onClick={handlerCurrentGender} id="Genderless" className={`filter-buttons-wrapper__element ${currentGender === 'Genderless' && 'filter-buttons-wrapper__selected'} `}>Genderless</div>
                </div>
                )}
        <button onClick={handlerSpecies} className="filter-buttons-wrapper__button-down">Species</button>
        {species
                && (
                <div className="filter-buttons-wrapper__elements">
                  <div onClick={handlerCurrentSpecies} id="Human" className={`filter-buttons-wrapper__element ${currentSpecies === 'Human' && 'filter-buttons-wrapper__selected'} `}>Human</div>
                  <div onClick={handlerCurrentSpecies} id="Alien" className={`filter-buttons-wrapper__element ${currentSpecies === 'Alien' && 'filter-buttons-wrapper__selected'} `}>Alien</div>
                  <div onClick={handlerCurrentSpecies} id="Humanoid" className={`filter-buttons-wrapper__element ${currentSpecies === 'Humanoid' && 'filter-buttons-wrapper__selected'} `}>Humanoid</div>
                  <div onClick={handlerCurrentSpecies} id="Poopybutthole" className={`filter-buttons-wrapper__element ${currentSpecies === 'Poopybutthole' && 'filter-buttons-wrapper__selected'} `}>Poopybutthole</div>
                  <div onClick={handlerCurrentSpecies} id="Mythological" className={`filter-buttons-wrapper__element ${currentSpecies === 'Mythological' && 'filter-buttons-wrapper__selected'} `}>Mythological</div>
                  <div onClick={handlerCurrentSpecies} id="Unknown" className={`filter-buttons-wrapper__element ${currentSpecies === 'Unknown' && 'filter-buttons-wrapper__selected'} `}>Unknown</div>
                  <div onClick={handlerCurrentSpecies} id="Animal" className={`filter-buttons-wrapper__element ${currentSpecies === 'Animal' && 'filter-buttons-wrapper__selected'} `}>Animal</div>
                  <div onClick={handlerCurrentSpecies} id="Disease" className={`filter-buttons-wrapper__element ${currentSpecies === 'Disease' && 'filter-buttons-wrapper__selected'} `}>Disease</div>
                  <div onClick={handlerCurrentSpecies} id="Robot" className={`filter-buttons-wrapper__element ${currentSpecies === 'Robot' && 'filter-buttons-wrapper__selected'} `}>Robot</div>
                  <div onClick={handlerCurrentSpecies} id="Cronenberg" className={`filter-buttons-wrapper__element ${currentSpecies === 'Cronenberg' && 'filter-buttons-wrapper__selected'} `}>Cronenberg</div>
                  <div onClick={handlerCurrentSpecies} id="Planet" className={`filter-buttons-wrapper__element ${currentSpecies === 'Planet' && 'filter-buttons-wrapper__selected'} `}>Planet</div>
                </div>
                )}
      </div>
    </div>
  );
}

export default Filter;
