import React, { useEffect, useState, useContext } from 'react'
import './login.css'
import {GrClose} from 'react-icons/gr'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from '../../firebase'
import { AuthContext } from '../../Auth'
import {Redirect} from 'react-router'

// uiConfig of StyledFirebaseAuth
const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: '/all-competitions',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    }
  }

const Login = (props) => {
    const {currentUser} = useContext(AuthContext);

    if(currentUser){
        return <Redirect to={props.history.goBack()} /> //if user is signed in, redirecting to homepage.
    }
    return (
        <div className='login'>
            <div className='login-card'>
                <a className='close-btn' onClick={() => props.history.goBack()}><GrClose /></a>
                <h3 style={{color: '#333'}}>Login/SignUp</h3>
            <div style={{marginTop: '60px'}}>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> 
            </div>
            </div>
        </div>
    )
}

export default Login
