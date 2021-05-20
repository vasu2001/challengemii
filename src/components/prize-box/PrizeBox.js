import React from 'react'
import './prizeBox.css'
import coins from '../../assets/coin.png'

const PrizeBox = ({data,onRedeem}) => {
    return (
        <div className='prize-box'>
            <div className='img-holder'>
                <img src={data.image}></img>
            </div>
            <div className='prize-info'>
                <p>Flat discount</p>
                <h1>{data.name}</h1>
                <p>on Headphones & Earphones</p>
            </div>
            <a className='btn-add' onClick={onRedeem}>Redeem <span><img src={coins} className='prize-value'></img>{data.coins}</span></a>
            <div className='circle'></div>
            <div className='circle rightc'></div>
        </div>
    )
}

export default PrizeBox
