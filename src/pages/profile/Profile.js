import React, { Fragment, useEffect } from 'react';
import { Route,Switch } from 'react-router-dom';
import Basic from '../../components/Basic-info/Basic'
import Nav from '../../components/Nav-new/Nav'
import ProfileDP from '../../components/Photo-edit/ProfileDp';
import Side from '../../components/Profile-side/Side';
import Top from '../../components/Profile-top/Top';
import Footer from '../../components/Footer/Footer'
import MyCompi from "../../components/My-compi/MyCompi";
import './profile.css'
import PastCompi from '../../components/Past-profile/PastCompi';
import ManageCoins from '../../components/Manage-coins/ManageCoins';
import firebase from '../../firebase';
import { connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux';

const Profile = (props) => {

    useEffect(()=>{
        console.log('userId', props.user);
    },[props.user])
    if(props.user){
    return (
        <div className='profile'>
            {/* <Nav /> */}
            <div className='profile-container'>
            <Side user={props.user} />
                <div className='nav-main'>
                <Switch>
                    <Route exact path='/profile/edit-profile' render={() => <Fragment><Top title='Public profile'/><Basic user={props.user}/></Fragment>} />
                </Switch>
                {/* <Switch>
                    <Route exact path='/profile/edit-photo' render={() => <Fragment><Top title='Photo'/><ProfileDP /></Fragment>} />
                </Switch> */}
                <Switch>
                    <Route exact path='/profile/past-competitions' render={() => <Fragment><Top title='Past Competitions'/><PastCompi /></Fragment>} />
                </Switch>
                <Switch>
                    <Route exact path='/profile/my-competitions' render={() => <Fragment><Top title='My Competitions'/><MyCompi user={props.user} /></Fragment>} />
                </Switch>
                <Switch>
                    <Route exact path='/profile/manage-coins' render={() => <Fragment><Top title='Manage Coins'/><ManageCoins user={props.user} /></Fragment>} />
                </Switch>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
    }
    else{
        return(
            <center>
                <h3>Loading</h3>
            </center>
        )
    }
}

const mapStateToProps = (state) => {
    const currentUser = firebase.auth().currentUser;
    const user = currentUser ? currentUser:'' 
    return{
        user: user
    }
}  

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'user'}
    ])
)(Profile)
