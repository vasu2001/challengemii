import React from 'react'
import './top.css';

const Top = (props) => {
    return (
        <div>
            <div className='top-container'>
                <h2>{props.title}</h2>
                <p style={{marginTop:'5px'}}>Add information about yourself</p>
            </div>
        </div>
    )
}

export default Top
