import React from 'react'
import './manageCoins.css'
import coins from '../../assets/coin.png'
const ManageCoins = () => {
    return (
        <div>
            <div className='manage-coins'>
                <div className='manage-coins-container'>
                    <h2>Balance</h2>
                    <img src={coins} alt='coins' className='coin-img manage-img'/>
                    <h4>2000</h4>
                    <div className='coin-action'>
                        <a className='btn-buy'>Buy</a>
                        <a className='btn-redeem'>Redeem now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCoins
