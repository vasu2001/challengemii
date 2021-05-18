import React, { useState } from 'react'
import './prizeBox.css'
import pizza from '../../assets/pizza.jpg'
import coins from '../../assets/coin.png'
import QuestionModal from '../Question-modal/QuestionModal'

const PrizeBox = ({data,onRedeem}) => {

    const [modalDisplay,setModalDisplay] = useState(false)

    const setModalState = () => {
        setModalDisplay(false);
    }

    return (
        <div className='prize-box'>
            {
                modalDisplay?<QuestionModal displayState={setModalState} />: null
            }
            <div className='img-holder'>
                <img src={data.image}></img>
            </div>
            <div className='prize-info'>
                <p>{data.name}</p>
                <p><span><img src={coins} className='prize-value'></img></span>{data.coins} coins</p>
            </div>
            <a className='btn-add' onClick={() => {setModalDisplay(true)}}>Redeem</a>
        </div>
    )
}

export default PrizeBox
