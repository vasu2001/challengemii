import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, Route,Switch } from 'react-router-dom';
import Basic from '../../components/Basic-info/Basic'
import Side from '../../components/Profile-side/Side';
import Top from '../../components/Profile-top/Top';
import Footer from '../../components/Footer/Footer'
import MyCompi from "../../components/My-compi/MyCompi";
import './profile.css'
import PastCompi from '../../components/Past-profile/PastCompi';
import ManageCoins from '../../components/Manage-coins/ManageCoins';
import firebase from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../Auth';

const db = firebase.firestore();

const Profile = (props) => {
    const [currentUser,setCurrentUser] = useContext(AuthContext); // to get the id of current user 
    const [user,setUser] = useState({}); // to hold the data of user stored in firestore database

    useEffect(() => {
        if(currentUser){
            db.collection('users').doc(currentUser.uid).get().then(doc => {
                if(doc.exists){
                    setUser(doc.data())                    
                }
            })    
        }

    },[currentUser])

    if(!currentUser || !user){
        return(
            <center>
                <h3>Loading...</h3>
            </center>
        )
    }
    else{
    return (
        <div className='profile'>
            <div className='profile-container'>
            <Side user={currentUser} />
                <div className='nav-main'>
                <Switch>
                    <Route exact path='/profile/edit-profile' render={() => <Fragment><Top title='Public profile'/><Basic user={user}/></Fragment>} />
                </Switch>
                <Switch>
                    <Route exact path='/profile/past-competitions' render={() => <Fragment><Top title='Past Competitions'/><PastCompi /></Fragment>} />
                </Switch>
                <Switch>
                    <Route exact path='/profile/my-competitions' render={() => <Fragment><Top title='My Competitions'/><MyCompi user={currentUser.uid} /></Fragment>} />
                </Switch>
                <Switch>
                    <Route exact path='/profile/manage-coins' render={() => <Fragment><Top title='Manage Coins'/><ManageCoins user={user} uid={currentUser.uid} /></Fragment>} />
                </Switch>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
    }
}

export default Profile