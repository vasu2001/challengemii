import React, {Fragment,useState,useContext,useEffect} from 'react'
import Side from '../../components/Profile-side/Side'
import './profile.css'
import {AuthContext} from '../../Auth'
import firebase from '../../firebase'
import { Redirect, Route,Switch } from 'react-router-dom';
import Top from '../../components/Profile-top/Top';
import PastCompi from '../../components/Past-profile/PastCompi';
import ManageCoins from '../../components/Manage-coins/ManageCoins';
import Basic from '../../components/Basic-info/Basic'
import MyCompi from "../../components/My-compi/MyCompi";

const db = firebase.firestore()

const Profile = () => {
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

    },[currentUser]);
    if(!currentUser || !user){
        return(
            <center>
                <h3>Loading...</h3>
            </center>
        )
    }
    else{
    return (
        <div className='profile-new'>
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
        </div>
    )
    }
}

export default Profile
