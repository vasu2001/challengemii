import React from 'react'
import { Route,Switch } from 'react-router-dom';
import Competition from './pages/competition/Competition';
import Vote from './pages/vote/vote';
import Home from './pages/home/home';
import Profile from './pages/profile/Profile';
import './App.css'; 
import Nav from './components/Nav-new/Nav';
import UserProfile from './pages/User-profile/UserProfile';

const App = () => {
    return (
        <div className='app'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/competition' component={Competition}/>
                <Route path='/profile' component={Profile} />
                <Route path='/user/username' component={UserProfile} />
            </Switch>           
        </div>
    )
}

export default App;
