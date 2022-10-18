import React, { useState, useEffect } from 'react';
import Character from './Character';
import './Characters.css';
import FilterIcon from '../../content/icons/filter.png';
import ArrowLeft from '../../content/icons/arrow-left.png';
import ArrowRight from '../../content/icons/arrow-right.png';
import Facebook from '../../content/icons/facebook.png';
import LinkedIn from '../../content/icons/linkedin.png';
import Github from '../../content/icons/github.png';

import Filter from '../Filter/Filter';

function Characters() {
  const [url, setUrl] = useState('https://rickandmortyapi.com/api/character/'); // Fetching charact. API
  const [info, setInfo] = useState({});
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState(false);

  const [error, setError] = useState(false);
  const [addition, setAddition] = useState('');

  const getDataValue = (value) => {
    setAddition(value);
  };

  const getErrorValue = (value) => {
    setError(value);
  };

  const getSearchValue = (value) => {
    setSearch(value);
  };

  useEffect(() => { // Checking some data objects (testing purposes)
    console.log('url: ', url);
    console.log('info: ', info);
    console.log('results', results);
    console.log('search: ', search);
  }, [info, url, search, results]);

  useEffect(() => {
    const controller = new AbortController(); // combined url + result in input for
    fetch(`${url}?page=${page}&name=${search}${addition}`, { signal: controller.signal }, {
      method: 'GET',
    }).then((response) => {
      if (response.status === 404) {
        setError(true);
        throw new Error('Smth wrong');
      }
      return response.json();
    }).then((result) => {
      setInfo(result.info);
      setResults(result.results);
    }).catch((error) => {
      setPage(1);
    });
    return () => {
      controller.abort();
    };
  }, [search, page, url, addition, error]); // Serach as a main dependency for this

  const handlerPreviousPage = (event) => {
    event.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(info.pages);
    }
  };

  const handlerNextPage = (event) => {
    event.preventDefault();
    if (page <= info.pages) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };

  const filteredArray = results.map((result, index) => (
    <div className="element-wrapper">
      <Character props={result} index={index} />
    </div>
  ));

  const handlerOpenFilter = (event) => {
    event.preventDefault();
    return filter === false ? setFilter(true) : setFilter(false);
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
              setSearch(e.target.value);
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
