import React, { Fragment } from 'react';
import { Route,Switch } from 'react-router-dom';
import Basic from '../../components/Basic-info/Basic'
import Nav from '../../components/Nav-new/Nav'
import ProfileDP from '../../components/Photo-edit/ProfileDp';
import Side from '../../components/Profile-side/Side';
import Top from '../../components/Profile-top/Top';
import Footer from '../../components/Footer/Footer'

import './profile.css'
import PastCompi from '../../components/Past-profile/PastCompi';

const Profile = () => {
    return (
        <div className='profile'>
            <Nav />
            <div className='profile-container'>
            <Side />
                <div className='nav-main'>
                <Switch>
                    <Route exact path='/profile/edit-profile' render={() => <Fragment><Top title='Public profile'/><Basic /></Fragment>} />
                </Switch>
                <Switch>
                    <Route exact path='/profile/edit-photo' render={() => <Fragment><Top title='Photo'/><ProfileDP /></Fragment>} />
                </Switch>
                <Switch>
                    <Route exact path='/profile/past-competitions' render={() => <Fragment><Top title='Past Competitions'/><PastCompi /></Fragment>} />
                </Switch>
                <Switch>
                    <Route exact path='/profile/my-competitions' render={() => <Fragment><Top title='My Competitions'/><PastCompi /></Fragment>} />
                </Switch>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
