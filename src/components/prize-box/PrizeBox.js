import React from 'react'
import './prizeBox.css'
import pizza from '../../assets/pizza.jpg'
import coins from '../../assets/coin.png'

const PrizeBox = ({data,onRedeem}) => {
    return (
        <div className='prize-box'>
            <div className='img-holder'>
                <img src={data.image}></img>
            </div>
            <div className='prize-info'>
                <p>{data.name}</p>
                <p><span><img src={coins} className='prize-value'></img></span>{data.coins} coins</p>
            </div>
            <a className='btn-add' onClick={onRedeem}>Redeem</a>
        </div>
    )
}

export default PrizeBox
