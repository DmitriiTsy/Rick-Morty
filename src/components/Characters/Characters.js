import React, {useState, useEffect} from 'react'
import Character from '../Characters/Character.js'
import './Characters.css'
import FilterIcon from '../../content/icons/filter.png'
import ArrowLeft from '../../content/icons/arrow-left.png'
import ArrowRight from '../../content/icons/arrow-right.png'
import Facebook from '../../content/icons/facebook.png'
import LinkedIn from '../../content/icons/linkedin.png'
import Github from '../../content/icons/github.png'


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
    }, [search, page, url, currentStatus, currentGender, currentSpecies, error])                       //Serach as a main dependency for this 

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
    <div>
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
                placeholder='Enter character name'
                className='all-wrapper-input__text'
                /> 
            </div>
                {error && <div>No characters found</div>}
                <div className='filter-elements-wrapper'>
                    {filter && 
                        <div className='filter-wrapper'>
                            <button onClick={HandlerClean} className='filter-wrapper__text'>Clear Filters</button>
                            <div className='filter-buttons-wrapper'>
                                <button onClick={HandlerStatus} className="filter-buttons-wrapper__button">Status</button>
                                {status && 
                                <div className="filter-buttons-wrapper__elements">
                                    <button onClick={HandlerCurrentStatus} value='Alive' style={currentStatus === 'Alive' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}} className="filter-buttons-wrapper__element">Alive</button>
                                    <button onClick={HandlerCurrentStatus} value='Dead' style={currentStatus === 'Dead' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}} className="filter-buttons-wrapper__element">Dead</button>
                                    <button onClick={HandlerCurrentStatus} value='Unknown' style={currentStatus === 'Unknown' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}} className="filter-buttons-wrapper__element">Unknown</button>
                                </div>
                                }
                                <button onClick={HandlerGender} className="filter-buttons-wrapper__button">Gender</button>
                                {gender && 
                                <div className="filter-buttons-wrapper__elements">
                                    <button onClick={HandlerCurrentGender} value='female' style={currentGender === 'female' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}} className="filter-buttons-wrapper__element">female</button>
                                    <button onClick={HandlerCurrentGender} value='male' style={currentGender === 'male' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}} className="filter-buttons-wrapper__element">male</button>
                                    <button onClick={HandlerCurrentGender} value='unknown' style={currentGender === 'unknown' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}} className="filter-buttons-wrapper__element">unknown</button>
                                    <button onClick={HandlerCurrentGender} value='genderless' style={currentGender === 'genderless' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}} className="filter-buttons-wrapper__element">genderless</button>
                                </div>
                                }
                                <button onClick={HandlerSpecies} className="filter-buttons-wrapper__button-down">Species</button>
                                {species && 
                                <div className="filter-buttons-wrapper__elements">
                                    <button onClick={HandlerCurrentSpecies} value='Human' style={currentSpecies === 'Human' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}} className="filter-buttons-wrapper__element">Human</button>
                                    <button onClick={HandlerCurrentSpecies} value='Alien' style={currentSpecies === 'Alien' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Alien</button>
                                    <button onClick={HandlerCurrentSpecies} value='Humanoid' style={currentSpecies === 'Humanoid' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Humanoid</button>
                                    <button onClick={HandlerCurrentSpecies} value='Poopybutthole' style={currentSpecies === 'Poopybutthole' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Poopybutthole</button>
                                    <button onClick={HandlerCurrentSpecies} value='Mythological' style={currentSpecies === 'Mythological' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Mythological</button>
                                    <button onClick={HandlerCurrentSpecies} value='Unknown' style={currentSpecies === 'Unknown' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Unknown</button>
                                    <button onClick={HandlerCurrentSpecies} value='Animal' style={currentSpecies === 'Animal' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Animal</button>
                                    <button onClick={HandlerCurrentSpecies} value='Disease' style={currentSpecies === 'Disease' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Disease</button>
                                    <button onClick={HandlerCurrentSpecies} value='Robot' style={currentSpecies === 'Robot' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Robot</button>
                                    <button onClick={HandlerCurrentSpecies} value='Cronenberg' style={currentSpecies === 'Cronenberg' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Cronenberg</button>
                                    <button onClick={HandlerCurrentSpecies} value='Planet' style={currentSpecies === 'Planet' ? {backgroundColor: 'grey', color:'white'}:{backgroundColor: 'white', color:'grey'}}  className="filter-buttons-wrapper__element">Planet</button>
                                </div>
                                }
                            </div>
                        </div>
                    }
                    <div className='elements-wrapper'>
                        {FilteredArray}
                    </div>
                </div>
                <div className='all-pages'>
                    <button onClick={(event) => HandlerBefore(event)} className="all-pages__arrows-button">
                        <img src={ArrowLeft} className="all-pages__arrows"/>
                    </button>
                    <div className='all-pages__text'>{page}/{info.pages}</div>
                    <button onClick={(event) => HandlerAfter(event)} className="all-pages__arrows-button">
                        <img src={ArrowRight} className="all-pages__arrows"/>
                    </button>
                </div>
        </div>
        <div className='footer'>
            <img src={Facebook} className="footer__element"/>
            <img src={LinkedIn} className="footer__element"/>
            <img src={Github} className="footer__element"/>
        </div>
    </div>
    )
}

export default Characters
