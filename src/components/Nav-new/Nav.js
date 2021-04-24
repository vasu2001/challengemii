import React from 'react'
import './nav.css';

import coins from '../../assets/coin.png'

const Nav = () => {
    
    const trigger = () => {
        window.location = '/'
    }

    return (
        <div className='nav-new'>
            <p className="logo-new" onClick={trigger}>Challengemii</p>
            <div className='nav-items'>
                <img src={coins} alt='coins' className='coin-img'/>
                <p className='item-text'>90 Points</p>
                <a className='btn btn-signin'>Sign in</a>
            </div>
        </div>
    )
}

export default Nav
