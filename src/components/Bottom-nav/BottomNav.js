import React, { useContext, useEffect, useState } from 'react'
import './bottomNav.css'
import {CgProfile} from 'react-icons/cg'
import userImg from '../../assets/user.png'
import coinImg from '../../assets/coins.png'
import ticketImg from '../../assets/ticket.png'
import competitionImg from '../../assets/competition.png'
import { AuthContext } from '../../Auth'
import firebase from '../../firebase';
import { Link, NavLink } from 'react-router-dom'

const db = firebase.firestore();

const BottomNav = () => {

    const {currentUser, setCurrentUser, userData:user} = useContext(AuthContext);
  

    if(!currentUser || !user){
    return (
        <div className='bottom-nav'>
            <div className='item-box'>
                <img src={competitionImg} className='bottom-nav-icons' onClick={() => window.location.href = '/sign-in'}></img>
                Competitions
            </div>
            <div className='item-box'>
                <img src={ticketImg} className='bottom-nav-icons' onClick={() => window.location.href = '/sign-in'}></img>
                Buy
            </div>
            <div className='item-box' onClick={() => window.location.href = '/sign-in'}>
                <img src={coinImg} className='bottom-nav-icons'></img>
                Redeem
            </div>
            <div className='item-box' onClick={() => window.location.href = '/sign-in'}>
                <img src={userImg} className='bottom-nav-icons'></img>
                Profile
            </div>
        </div>
    )
    }
    else{
        return(
        <div className='bottom-nav'>
            <NavLink to='/all-competitions' >
                <div className='item-box'>
                    <img src={competitionImg} className='bottom-nav-icons'></img>
                    Competitions
                </div>
            </NavLink>
            <div className='item-box ticket-container' onClick={() => window.location.href = '/profile/manage-coins'}>
                <div className='tickets'>
                    {user.tickets}
                </div>
                <img src={ticketImg} className='bottom-nav-icons'></img>
                Buy
            </div>
            <div className='item-box coin-container' onClick={() => window.location.href = '/profile/manage-coins'}>
                <div className='coins'>
                    {user.coin}
                </div>
                <img src={coinImg} className='bottom-nav-icons'></img>
                Redeem
            </div>
            <div className='item-box'>
                <img src={currentUser.photoURL} className='bottom-nav-icons profile-icon' onClick={() => window.location.href = '/user/username'}></img>
                Profile
            </div>
        </div>
        )
    }
}

export default BottomNav
