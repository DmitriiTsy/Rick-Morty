import React, {useState, useEffect} from 'react'
import Character from '../Characters/Character.js'
import './Characters.css'


const Characters = () => {
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/character/')    // Fetching charact. API
    const [info, setInfo] = useState({})                  
    const [results, setResults] =useState([])
    const [search, setSearch] =useState('')
    const [page, setPage] = useState(1)
  
    useEffect(() => {                   //Checking some data objects (testing purposes) 
      console.log('url: ', url)
      console.log('info: ', info)
      console.log('results', results)
      console.log('search: ', search)
    }, [info, url,search, results])
  
    useEffect(()=>{                     //combined url + result in input for search filter purpose
        fetch(`${url}?page=${page}&name=${search}`, {
          method: 'GET'
        }).then((response) => {
          return response.json()
        }).then((result) => {
            setInfo(result.info)
            setResults(result.results)
        }).catch((error) => {
            setPage(1)
            console.log(error)
        })
    }, [search, page])                       //Serach as a main dependency for this 

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
  
    return (
        <div className="all-wrapper">
            <button onClick={(event) => HandlerBefore(event)}>-</button>
            <p>{page}/{info.pages}</p>
            <button onClick={(event) => HandlerAfter(event)}>+</button>

            <div>
                <input onChange={(e) => {
                setSearch(e.target.value)
            }}
            value={search}
            type='text'
            placeholder='Enter name'
            /> 
            </div>
            <div className='elements-wrapper'>
            {results.map((result, index) => (
                <div className='element-wrapper'>
                    <Character props={result} index={index}/>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Characters
