import React from 'react'
import './prizeBox.css'
import pizza from '../../assets/pizza.jpg'
import coins from '../../assets/coin.png'

const PrizeBox = () => {
    return (
        <div className='prize-box'>
            <div className='img-holder'>
                <img src={pizza}></img>
            </div>
            <div className='prize-info'>
                <p>Pepperoni Pizza</p>
                <p><span><img src={coins} className='prize-value'></img></span>100 coins</p>
            </div>
            <a className='btn-add'>Add to cart</a>
        </div>
    )
}

export default PrizeBox
