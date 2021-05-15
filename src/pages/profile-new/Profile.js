import React, {useState,useContext,useEffect} from 'react'
import Side from '../../components/Profile-side/Side'
import './profile.css'
import {AuthContext} from '../../Auth'
import firebase from '../../firebase'

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
            </div>
        </div>
    )
    }
}

export default Profile
