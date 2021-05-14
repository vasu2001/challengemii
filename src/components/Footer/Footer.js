import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='logo-footer'>
                <p>Challenge<span style={{color: 'red'}}>mii</span></p>
            </div>
            <div className='footer-links'>
                <p className='footer-link-text'>Competitions</p>
                <p className='footer-link-text'>Buy Tickets</p>
                <p className='footer-link-text'>Redeem Coins</p>
            </div>
        </div>
    )
}

export default Footer
