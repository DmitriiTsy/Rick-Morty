import React, {useState, useEffect} from 'react'
import Character from '../Characters/Character.js'
import './Characters.css'
import FilterIcon from '../../content/icons/filter.png'


const Characters = () => {
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/character/')    // Fetching charact. API
    const [info, setInfo] = useState({});             
    const [results, setResults] =useState([]);
    const [search, setSearch] =useState('');
    const [page, setPage] = useState(1);

    const [filter, setFilter] = useState(false)

    const [status, setStatus] = useState(false);     //States to open additional filters
    const [gender, setGender] = useState(false);
    const [species, setSpecies] = useState(false);

    const [currentStatus, setCurrentStatus] = useState('');         //States with value
    const [currentGender, setCurrentGender] = useState('');
    const [currentSpecies, setCurrentSpecies] = useState('');

    const [error, setError] = useState(false);
  
    useEffect(() => {                   //Checking some data objects (testing purposes) 
      console.log('url: ', url)
      console.log('info: ', info)
      console.log('results', results)
      console.log('search: ', search)
    }, [info, url,search, results])
  
    useEffect(()=>{                     //combined url + result in input for search filter purpose
        fetch(`${url}?page=${page}&name=${search}&status=${currentStatus}&gender=${currentGender}&species=${currentSpecies}`, {
          method: 'GET'
        }).then((response) => {
            if (response.status === 404) {
                setError(true)
                throw new Error('Smth wrong')
            }
        return response.json()
        }).then((result) => {
            setInfo(result.info)
            setResults(result.results)

            
        }).catch((error) => {
            setPage(1)
            console.log(error)
        })
    }, [search, page, url, currentStatus, currentGender, currentSpecies])                       //Serach as a main dependency for this 

    const HandlerBefore = (event) => {
        event.preventDefault();
        if (page > 1) {
            setPage(page - 1);
        }   else {
            setPage(info.pages);
        }
    }

    const HandlerAfter = (event) => {
        event.preventDefault();
        if (page <= info.pages) {
            setPage(page + 1);
        }   else {
            setPage(1);
        }
    }

    const FilteredArray = results.map((result, index) => (
        <div className='element-wrapper'>
            <Character props={result} index={index}/>
        </div>
    ))

    const HandlerFilter = (event) => {
        event.preventDefault();
        return filter === false? setFilter(true): setFilter(false);
    }

    const HandlerStatus = (event) => {
        event.preventDefault();
        return status === false? setStatus(true): setStatus(false);
    }

    const HandlerSpecies = (event) => {
        event.preventDefault();
        return species === false? setSpecies(true): setSpecies(false);
    }

    const HandlerGender = (event) => {
        event.preventDefault();
        return gender === false? setGender(true) : setGender(false)
    }

    const HandlerCurrentStatus = (event) => {
        event.preventDefault();
        setCurrentStatus(event.target.value)
    }

    const HandlerCurrentSpecies = (event) => {
        event.preventDefault();
        setCurrentSpecies(event.target.value)
    }

    const HandlerCurrentGender = (event) => {
        event.preventDefault();
        setCurrentGender(event.target.value)
    }

    const HandlerClean = (event) => {
        event.preventDefault();
        setSearch('')
        setStatus(false)
        setSpecies(false)
        setGender(false)
        setCurrentStatus('')
        setCurrentGender('')
        setCurrentSpecies('')
        setError(false)
    }

    return (
        <div className="all-wrapper">
            <div className="all-wrapper-input">
                <button className="all-wrapper-input__filter-button" onClick={HandlerFilter}>
                    <img src={FilterIcon} className="all-wrapper-input__filter"/>
                </button>
                <input onChange={(e) => {
                setSearch(e.target.value)
                }}
                value={search}
                type='text'
                placeholder='Enter name'
                /> 
            </div>
            <div className='elements-wrapper'>
            {error && <div>No characters found</div>}
            {filter && 
            <div className='filter-wrapper'>
                <button onClick={HandlerClean}>Clear Filters</button>
                <div className='filter-buttons-wrapper'>
                    <button onClick={HandlerStatus}>Status</button>
                    {status && 
                    <div>
                        <button onClick={HandlerCurrentStatus} value='Alive'>Alive</button>
                        <button onClick={HandlerCurrentStatus} value='Dead'>Dead</button>
                        <button onClick={HandlerCurrentStatus} value='Unknown'>Unknown</button>
                    </div>
                    }
                    <button onClick={HandlerGender}>Gender</button>
                    {gender && 
                    <div>
                        <button onClick={HandlerCurrentGender} value='female'>female</button>
                        <button onClick={HandlerCurrentGender} value='male'>male</button>
                        <button onClick={HandlerCurrentGender} value='unknown'>unknown</button>
                        <button onClick={HandlerCurrentGender} value='genderless'>genderless</button>
                    </div>
                    }
                    <button onClick={HandlerSpecies}>Species</button>
                    {species && 
                    <div>
                        <button onClick={HandlerCurrentSpecies} value='Human'>Human</button>
                        <button onClick={HandlerCurrentSpecies} value='Alien'>Alien</button>
                        <button onClick={HandlerCurrentSpecies} value='Humanoid'>Humanoid</button>
                        <button onClick={HandlerCurrentSpecies} value='Poopybutthole'>Poopybutthole</button>
                        <button onClick={HandlerCurrentSpecies} value='Mythological'>Mythological</button>
                        <button onClick={HandlerCurrentSpecies} value='Unknown'>Unknown</button>
                        <button onClick={HandlerCurrentSpecies} value='Animal'>Animal</button>
                        <button onClick={HandlerCurrentSpecies} value='Disease'>Disease</button>
                        <button onClick={HandlerCurrentSpecies} value='Robot'>Robot</button>
                        <button onClick={HandlerCurrentSpecies} value='Cronenberg'>Cronenberg</button>
                        <button onClick={HandlerCurrentSpecies} value='Planet'>Planet</button>
                    </div>
                    }
                </div>
            </div>
            }
            {FilteredArray}
            </div>
            <div className='all-pages'>
                <button onClick={(event) => HandlerBefore(event)}>-</button>
                <p>{page}/{info.pages}</p>
                <button onClick={(event) => HandlerAfter(event)}>+</button>
            </div>
        </div>
    )
}

export default Characters
