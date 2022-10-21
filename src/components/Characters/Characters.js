/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useReducer } from 'react';
import Character from './Character';
import './Characters.css';
import FilterIcon from '../../content/icons/filter.png';
import ArrowLeft from '../../content/icons/arrow-left.png';
import ArrowRight from '../../content/icons/arrow-right.png';
import Facebook from '../../content/icons/facebook.png';
import LinkedIn from '../../content/icons/linkedin.png';
import Github from '../../content/icons/github.png';
import Filter from '../Filter/Filter';

const initialState = {
  info: {},
  results: [],
  search: '',
  page: '1',
  filter: false,
  error: false,
  url: 'https://rickandmortyapi.com/api/character/',
};

const ACTIONS = {
  INFO: 'info',
  RESULTS: 'results',
  SEARCH: 'search',
  PAGE: 'page',
  FILTER: 'filter',
  ERROR: 'error',
  URL: 'url',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INFO:
      return {
        ...state,
        info: action.payload,
      };
    case ACTIONS.RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    case ACTIONS.SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case ACTIONS.PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ACTIONS.FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ACTIONS.URL:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
}

function Characters() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    info, results, search, page, filter, error, url,
  } = state;
  const [addition, setAddition] = useState('');

  const getDataValue = (value) => {
    setAddition(value);
  };

  const getErrorValue = (value) => {
    dispatch({ type: ACTIONS.ERROR, payload: value });
  };

  const getSearchValue = (value) => {
    dispatch({ type: ACTIONS.SEARCH, payload: value });
  };

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${url}?page=${page}&name=${search}${addition}`, { signal: controller.signal }, {
      method: 'GET',
    }).then((response) => {
      if (response.status === 404) {
        dispatch({ type: ACTIONS.ERROR, payload: true });
        throw new Error('Smth wrong');
      }
      return response.json();
    }).then((result) => {
      dispatch({ type: ACTIONS.INFO, payload: result.info });
      dispatch({ type: ACTIONS.RESULTS, payload: result.results });
    }).catch((error) => {
      dispatch({ type: ACTIONS.PAGE, payload: 1 });
    });
    return () => {
      controller.abort();
    };
  }, [search, error, page, url, addition]);

  const handlerPreviousPage = (event) => {
    event.preventDefault();
    if (page > 1) {
      dispatch({ type: ACTIONS.PAGE, payload: state.page - 1 });
    } else {
      dispatch({ type: ACTIONS.PAGE, payload: state.info.pages });
    }
  };

  const handlerNextPage = (event) => {
    event.preventDefault();
    if (page <= info.pages) {
      dispatch({ type: ACTIONS.PAGE, payload: state.page + 1 });
    } else {
      dispatch({ type: ACTIONS.PAGE, payload: 1 });
    }
  };

  const filteredArray = results.map((result, index) => (
    <div className="element-wrapper">
      <Character props={result} index={index} />
    </div>
  ));

  const handlerOpenFilter = (event) => {
    event.preventDefault();
    return filter === false ? dispatch({ type: ACTIONS.FILTER, payload: true })
      : dispatch({ type: ACTIONS.FILTER, payload: false });
  };

  return (
    <div>
      <div className="all-wrapper">
        <div className="all-wrapper-input">
          <button className="all-wrapper-input__filter-button" onClick={handlerOpenFilter}>
            <img src={FilterIcon} className="all-wrapper-input__filter" alt="icon-filter" />
          </button>
          <input
            onChange={(e) => {
              dispatch({ type: ACTIONS.SEARCH, payload: e.target.value });
            }}
            value={search}
            type="text"
            placeholder="Enter character name"
            className="all-wrapper-input__text"
          />
        </div>
        {error && <div>No characters found</div>}
        <div className="filter-elements-wrapper">
          {filter && (
          <Filter
            getDataValue={getDataValue}
            getErrorValue={getErrorValue}
            getSearchValue={getSearchValue}
          />
          )}
          <div className="elements-wrapper">
            {filteredArray}
          </div>
        </div>
        <div className="all-pages">
          <button onClick={(event) => handlerPreviousPage(event)} className="all-pages__arrows-button">
            <img src={ArrowLeft} className="all-pages__arrows" alt="icon-arrow-left" />
          </button>
          <div className="all-pages__text">
            {page}
            /
            {info.pages}
          </div>
          <button onClick={(event) => handlerNextPage(event)} className="all-pages__arrows-button">
            <img src={ArrowRight} className="all-pages__arrows" alt="icon-arrow-right" />
          </button>
        </div>
      </div>
      <div className="footer">
        <img src={Facebook} className="footer__element" alt="icon-facebook" />
        <img src={LinkedIn} className="footer__element" alt="icon-linkedin" />
        <img src={Github} className="footer__element" alt="icon-github" />
      </div>
    </div>
  );
}

export default Characters;
