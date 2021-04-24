import React from 'react'
import './pastCompi.css';

import Card from '../../components/Cards/cards'

const PastCompi = () => {
    return (
        <div>   
            <div className='past-compi'>
                <div className='past-cards-container'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default PastCompi
