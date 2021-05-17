import React, { useEffect, useState, useContext } from 'react'
import './login.css'
import {GrClose} from 'react-icons/gr'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from '../../firebase'
import { AuthContext } from '../../Auth'
import {Redirect} from 'react-router'

const db = firebase.firestore(); //getting firestore

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
      signInSuccess: () => false
    }
  }

const Login = (props) => {

    const [active,setActive] = useState(true)    
    const {currentUser, setCurrentUser} = useContext(AuthContext);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                setCurrentUser(user) // updating currentUser state of Auth context 
                // saving user in database if no user exists with the same uid.
                const docRef = db.collection('users').doc(user.uid); 
                docRef.get().then(doc => {
                    if(doc.exists){
                        console.log('User found');
                    }
                    else{
                        db.collection('users').doc(user.uid).set({
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
                        })
                    }
                })
                }
            else console.log('no user found');
        })
    },[]);

    if(currentUser){
        return <Redirect to={props.history.goBack()} /> //if user is signed in, redirecting to homepage.
    }
    return (
        <div className='login'>
            <div className='login-card'>
                <a className='close-btn' onClick={() => console.log(props.history.goBack())}><GrClose /></a>
                <h3 style={{color: '#333'}}>Login/SignUp</h3>
            <div style={{marginTop: '60px'}}>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} onClick={()=>{setActive(false)}}/> 
            </div>
            </div>
        </div>
    )
}

export default Login
