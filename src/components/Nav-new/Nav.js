import React, { useContext, useEffect, useState } from 'react'
import './nav.css'
import {AuthContext} from '../../Auth';
import firebase from '../../firebase';
import coins from '../../assets/coin.png'
import { BiCoinStack } from 'react-icons/bi';

const Nav = () => {

    const [currentUser,setCurrentUser] = useContext(AuthContext);

    const [isVisible,setIsVisible] = useState(false);
    
    // Updating currentUser state in Auth Context 
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) setCurrentUser(user) 
            else console.log('no user found');
        })
    },[])

    if(!currentUser){
    return (
        <div className='nav-new'>
              <p className="logo-new" onClick={() => {window.location ='/'}}>Challengemii</p>
              <div className='nav-items'>
                  <p className='item-text link' onClick={() => {window.location = ('/all-competitions')}}>Competitions</p>
                  {/* Redirecting to sign-in page - LOGIN.JS */}
                  <a href={()=>false} className='btn btn-signin' onClick={()=> {window.location = ('/sign-in')} }>Sign in</a>
          </div>
        </div>
    )
    }
    else{
        return(
            <div className='nav-new'>
              <p className="logo-new" onClick={() => {window.location ='/'}}>Challengemii</p>
              <div className='nav-mid'>
                <p className='link' onClick={() => {window.location = '/all-competitions'}}>Competitons</p>
                <p className='link' onClick={() => {window.location = '/profile/manage-coins'}}>Buy Tickets</p>
                <p className='link' onClick={() => {window.location = '/profile/manage-coins'}}>Redeem Coins</p>
              </div>
              <div className='nav-items'>
                  <img src={coins} alt='coins' className='coin-img'/>
                  <p className='item-text'>100 Points</p>
                  {
                    <div>
                      <div className='nav-profile-box' onClick={() => window.location.href = '/profile/edit-profile'}>
                        <img src={currentUser.photoURL} alt='' className='nav-profile' onClick={()=>{setIsVisible(!isVisible)}} />
                      </div>
                    </div>
                  }
                  <p className='item-text' style={{marginLeft: '10px', cursor:'pointer'}} onClick={() => {firebase.auth().signOut(); window.location.reload()}}>SIGN OUT</p>
              </div>
              </div>
        )
    }
}

export default Nav
