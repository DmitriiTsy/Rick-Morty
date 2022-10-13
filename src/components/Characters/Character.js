import React, {useState} from 'react'
import './Character.css'

const Character = ({props, index}) => {
    const {image,name,status,species,gender} = props

    const [TouchImage, setTouchImage] = useState(false)

    const HandlerTouch = (event) => {
        event.preventDefault();
        return TouchImage === false? setTouchImage(true) : setTouchImage(false)
    }
    return (
        <div className='Character-wrapper'>
            <div className="Character-wrapper__images">
                <img src={image} onClick={HandlerTouch} className="Character__image"/>
            </div>
            {TouchImage && 
            <div className="Character-wrapper__text">
                <p key={index}>Name: {name}</p>
                <p>Status: {status}</p>
                <p>Species:{species}</p>
                <p>Gender:{gender}</p>
                <p>Origin name:{props.origin.name}</p>
                <p>Location:{props.location.name}</p>
            </div>}
        </div>
    )
}





export default Character