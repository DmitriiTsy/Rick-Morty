/* eslint-disable no-console */
import { useReducer } from 'react';

const initialState = {
  status: false,
  gender: false,
  species: false,
  currentStatus: '',
  currentGender: '',
  currentSpecies: '',
  clean: '',
};

const ACTIONS = {
  STATUS: 'status',
  GENDER: 'gender',
  SPECIES: 'species',
  CURRENT_STATUS: 'current-status',
  CURRENT_GENDER: 'current-gender',
  CURRENT_SPECIES: 'current-species',
  CLEAN: 'clean',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case ACTIONS.GENDER: {
      return {
        ...state,
        gender: action.payload,
      };
    }
    case ACTIONS.SPECIES: {
      return {
        ...state,
        species: action.payload,
      };
    }
    case ACTIONS.CURRENT_STATUS: {
      return {
        ...state,
        currentStatus: action.payload,
      };
    }
    case ACTIONS.CURRENT_GENDER: {
      return {
        ...state,
        currentGender: action.payload,
      };
    }
    case ACTIONS.CURRENT_SPECIES: {
      return {
        ...state,
        currentSpecies: action.payload,
      };
    }
    case ACTIONS.CLEAN: {
      return {
        ...state,
        currentSpecies: action.currentAction,
        currentStatus: action.currentAction,
        currentGender: action.currentAction,
        gender: action.payload,
        species: action.payload,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}

function useFilter({ props }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getErrorValue, getSearchValue } = props;

  const handlerCurrentStatus = (event) => {
    dispatch({ type: ACTIONS.CURRENT_STATUS, payload: event.target.id });
  };

  const handlerCurrentSpecies = (event) => {
    dispatch({ type: ACTIONS.CURRENT_SPECIES, payload: event.target.id });
  };

  const handlerCurrentGender = (event) => {
    dispatch({ type: ACTIONS.CURRENT_GENDER, payload: event.target.id });
  };

  const handlerStatus = (event) => {
    event.preventDefault();
    return state.status === false ? dispatch({ type: ACTIONS.STATUS, payload: true })
      : dispatch({ type: ACTIONS.STATUS, payload: false });
  };

  const handlerSpecies = (event) => {
    event.preventDefault();
    return state.species === false ? dispatch({ type: ACTIONS.SPECIES, payload: true })
      : dispatch({ type: ACTIONS.SPECIES, payload: false });
  };

  const handlerGender = (event) => {
    event.preventDefault();
    return state.gender === false ? dispatch({ type: ACTIONS.GENDER, payload: true })
      : dispatch({ type: ACTIONS.GENDER, payload: false });
  };

  const handlerClean = (event) => {
    event.preventDefault();
    getErrorValue(false);
    getSearchValue('');
    dispatch({ type: ACTIONS.CLEAN, payload: false, currentAction: '' });
  };

  return [
    handlerCurrentStatus,
    handlerCurrentSpecies,
    handlerCurrentGender,
    state.currentStatus,
    state.currentSpecies,
    state.currentGender,
    handlerStatus,
    handlerSpecies,
    handlerGender,
    state.status,
    state.species,
    state.gender,
    handlerClean,
    state.requiredClean,
  ];
}

export default useFilter;
