import React, { useContext, useEffect, useState } from 'react'
import './nav.css'
import {AuthContext} from '../../Auth';
import firebase from '../../firebase';
import coins from '../../assets/coin.png'
import { BiCoinStack } from 'react-icons/bi';
import { GoSignOut } from 'react-icons/go';
import {Link,NavLink} from 'react-router-dom';

const db = firebase.firestore(); //getting firestore


const Nav = () => {

    const {currentUser,setCurrentUser,setUserData,userData} = useContext(AuthContext);
    const [isVisible,setIsVisible] = useState(false);
    
    useEffect(() => {
        const unsubsribe = firebase.auth().onAuthStateChanged(async user => {
            if(user){
                const userDoc = await firebase.firestore().collection('users').doc(user.uid).get()
                if(userDoc.exists){
                    setUserData(userDoc.data())
                }else{
                    // saving user in database if no user exists with the same uid.
                    const newUserData = {
                        name: user.displayName,
                        photoURL: user.photoURL,
                        coins: 0,
                        tickets: 0,
                        desc: '',
                        website: '',
                        twitter: '',
                        instagram: '',
                        facebook: '',
                        linkedin: ''
                    } 
                    await db.collection('users').doc(user.uid).set(newUserData)
                    setUserData(newUserData)
                }

                setCurrentUser(user) // updating currentUser state of Auth context                 
            }
            else console.log('no user found');
        })

        return ()=>{
            unsubsribe()
        }
    },[]);

    if(!currentUser){
    return (
        <div className='nav-new'>
            <Link to='/' style={{display:'flex'}}>
            <p className="logo-new">Challengemii</p>
            </Link>
              <div className='nav-items'>
                  <Link to='/all-competitions' style={{display:'flex'}}>
                    <p className='item-text link desktop' onClick={() => {window.location = ('/all-competitions')}}>Competitions</p>
                  </Link>
                  {/* Redirecting to sign-in page - LOGIN.JS */}
                  <a href={'/sign-in'} className='btn btn-signin'>Sign in</a>
          </div>
        </div>
    )
    }
    else{
        return(
            <div>
            <div className='nav-new'>
                <NavLink to='/' style={{display:'flex', color:'#fff'}}>
                    <p className="logo-new">Challengemii</p>
                </NavLink>
                <div className='nav-items'>
                <div className='desktop'>
                <Link to='/all-competitions' style={{display:'flex',color:'#fff'}}>
                  <p className='link' >Competitions</p>
                </Link>
                  <div className='link-box'> 
                  <Link to='/manage-tickets' style={{display:'flex',color:'#fff'}}>
                    <p className='link'>Buy Tickets</p>
                  </Link> 
                  <Link to='/profile/manage-coins' style={{display:'flex',color:'#fff'}}>
                    <p className='link'>Redeem Coins</p>
                  </Link>
                  </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <img src={coins} alt='coins' className='coin-img'/>
                      <p className='item-text'>{userData.coin} Coins</p>
                    </div>
                    <Link to='/user/username'>
                        <div className='nav-profile-box'>
                                <img src={currentUser.photoURL} alt='' className='nav-profile' onClick={()=>{setIsVisible(!isVisible)}} />
                        </div>
                    </Link>
                </div>
                    <p 
                        className='item-text' 
                        style={{fontSize:'30px' ,marginLeft: '20px', cursor:'pointer', display:'block'}} 
                        onClick={() => {
                            firebase.auth().signOut(); 
                            window.location.reload();
                        }}
                    >
                        <GoSignOut />
                    </p>
                </div>
            </div>
            </div>
        )
    }
}

export default Nav
