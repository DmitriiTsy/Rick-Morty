import React, {useState, useEffect} from 'react'
import Character from '../Characters/Character.js'
import './Characters.css'


const Characters = () => {
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/character/?name=')    // Fetching charact. API
    const [info, setInfo] = useState({})                  
    const [results, setResults] =useState([])
    const [search, setSearch] =useState('')
  
    useEffect(() => {                   //Checking some data objects (testing purposes) 
      console.log('url: ', url)
      console.log('info: ', info)
      console.log('results', results)
      console.log('search: ', search)
    }, [info, url,search, results])
  
    useEffect(()=>{                     //combined url + result in input for search filter purpose
        fetch(`${url}${search}`, {
          method: 'GET'
        }).then((response) => {
          return response.json()
        }).then((result) => {
            setInfo(result.info)
            setResults(result.results)
        }).catch((error) => {
            console.log(error)
        })
    }, [search])                        //Serach as a main dependency for this 
  
    return (
        <div className="all-wrapper">
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