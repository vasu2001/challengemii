import React from 'react'
import './card.css';

const Card = (props) => {
    return (
        <div className='card-info'>
            <h3 class='info-title'>{props.title}</h3>
            <div class='para-container'>
                <p class='info-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae sollicitudin eros. Morbi finibus ante sapien. Etiam ultricies ligula risus, vitae interdum purus iaculis at.</p>
            </div>
        </div>
    )
}

export default Card
