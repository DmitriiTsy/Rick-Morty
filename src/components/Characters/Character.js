import React, {useState} from 'react'
import './Character.css'

const Character = ({props, index}) => {
    const {image,name,status,species,gender, episode} = props

    const [TouchImage, setTouchImage] = useState(false)

    const HandlerTouch = (event) => {
        event.preventDefault();
        return TouchImage === false? setTouchImage(true) : setTouchImage(false)
    }

    const episodes = episode.length
    return (
        <div className='Character-wrapper'>
            <div className="Character-wrapper__images">
                <img src={image} onClick={HandlerTouch} className="Character__image"/>
            </div>
            {TouchImage && 
            <div className="Character-wrapper__text">
                <div key={index} className="Character-wrapper__name">{name}</div>
                <div className='Character-wrapper__species-block'>
                    <div>
                        {species}
                    </div>
                    <div className='Character-wrapper__species-wrapper'>
                        <div className='Character-wrapper__indicator' style={status === 'Alive'? {backgroundColor: 'green'}: {backgroundColor: 'red'}}></div>
                        <div>({status})</div>
                    </div>
                </div>
                <div className='Character-wrapper-gender'>
                    <div className='Character-wrapper-gender__text'>Gender: </div>
                    {gender}
                </div>
                <div className='Character-wrapper-seen'>
                    <div className='Character-wrapper-seen__text'>First seen in: </div>
                    {props.origin.name}
                </div>
                <div className='Character-wrapper-location'>
                    <div className='Character-wrapper-location__text'>Last known location: </div>
                    {props.location.name}
                </div>
                <div className='Character-wrapper-episodes'>
                    <div className='Character-wrapper-episodes__text'>
                        Episodes: 
                    </div>
                    <div>
                        {episodes}
                    </div>
                </div>
            </div>}
        </div>
    )
}





export default Character