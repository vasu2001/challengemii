import React from 'react'
import './nav.css';

import {GiHamburgerMenu} from 'react-icons/gi'

const Nav = () => {
    const changeURL = () => {
        window.location = '/';
    }
    return (
        <div className="Nav">
            <p className="logo" onClick={changeURL}>Challenge<span style={{color:"#B82601"}}>MII</span></p>
            <div className="sign">
            <a href="/competition" className="btn register">Register</a>
            <a href="competition/participant" className="btn">Sign in</a>
            <a href="competition/participant" className="btn profile"><GiHamburgerMenu /></a>
            </div>
        </div>
    )
}

export default Nav
