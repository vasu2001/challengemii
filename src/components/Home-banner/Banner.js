import React from 'react'
import './banner.css'

import {GiHamburgerMenu} from 'react-icons/gi'

const Banner = () => {

    return (
        <div className='home-banner'>
            <div className='navbar'>
                <h1 className="banner-logo">Challenge<span className='logo-secondary-part'>mii</span></h1>
                <div className='homenav-right'>
                    <a href='#competitions' className='nav-link'>Competitions</a>
                    <div className='hamburger-container'>
                        {/* <GiHamburgerMenu className="hamburger" /> */}
                        <p>Sign Up</p>
                    </div>
                </div>
            </div>
                <div className='banner-titlebox'>
                    <h1 className='title-heading'>Learn. Earn. <span id='title-heading'>Compete.</span></h1>
                    <h1 className='title-heading-sub'>Compete with the <span id='title-heading-sub'>best.</span></h1>
                    <a href='#competitions' className='btn btn-compete'>Compete<span style={{color:'#cd1010'}}> Now!</span></a>
                </div>
        </div>
    )
}

export default Banner
