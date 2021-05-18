import React, { useContext, useEffect, useState } from 'react'
import './nav.css'
import {AuthContext} from '../../Auth';
import firebase from '../../firebase';
import coins from '../../assets/coin.png'
import { BiCoinStack } from 'react-icons/bi';
import { GoSignOut } from 'react-icons/go';

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
            // <div className='nav-new'>
            //   <p className="logo-new" onClick={() => {window.location ='/'}}>Challengemii</p>
            //   <div className='nav-mid'>
            //     <p className='link' onClick={() => {window.location = '/all-competitions'}}>Competitons</p>
            //     <p className='link' onClick={() => {window.location = '/profile/manage-coins'}}>Buy Tickets</p>
            //     <p className='link' onClick={() => {window.location = '/profile/manage-coins'}}>Redeem Coins</p>
            //   </div>
            //   <div className='nav-items'>
            //       <img src={coins} alt='coins' className='coin-img'/>
            //       <p className='item-text'>100 Points</p>
            //       {
            //         <div>
            //           <div className='nav-profile-box' onClick={() => window.location.href = '/profile/edit-profile'}>
            //             <img src={currentUser.photoURL} alt='' className='nav-profile' onClick={()=>{setIsVisible(!isVisible)}} />
            //           </div>
            //         </div>
            //       }
            //       <p className='item-text' style={{marginLeft: '10px', cursor:'pointer'}} onClick={() => {firebase.auth().signOut(); window.location.reload()}}>SIGN OUT</p>
            //   </div>
            //   </div>
            <div>
            <div className='nav-new'>
                <p className="logo-new" onClick={() => {window.location ='/'}}>Challengemii</p>
                <div className='nav-items'>
                <div className='desktop'>
                  <p className='link' onClick={() => window.location.href = '/all-competitions'}>Competitions</p>
                  <div className='link-box'>  
                    <p className='link' onClick={() => window.location.href = '/profile/manage-tickets'}>Buy Tickets</p>
                    <p className='link' onClick={() => window.location.href = '/profile/manage-coins'}>Redeem Coins</p>
                  </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <img src={coins} alt='coins' className='coin-img'/>
                      <p className='item-text'>{userData.coin} Coins</p>
                    </div>
                    <div className='nav-profile-box' onClick={() => window.location.href = '/user/username'}>
                            <img src={currentUser.photoURL} alt='' className='nav-profile' onClick={()=>{setIsVisible(!isVisible)}} />
                    </div>
                </div>
                    <p className='item-text' style={{fontSize:'30px' ,marginLeft: '20px', cursor:'pointer', display:'block'}} onClick={() => {firebase.auth().signOut(); window.location.reload()}}><GoSignOut /></p>
                </div>
            </div>
            </div>
        )
    }
}

export default Nav
