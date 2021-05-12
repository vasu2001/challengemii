import React from 'react'
import { Route,Switch } from 'react-router-dom';
import Competition from './pages/competition/Competition';
import Home from './pages/home/home';
import Profile from './pages/profile/Profile';
import Vote from './pages/vote/vote'
import './App.css'; 
// import UserProfile from './pages/User-profile/UserProfile';
import Admin from './pages/admin-panel/Admin';
import Login from './components/Login/Login';
import Participation from './pages/Participation/Participation';
import AllCompetitions from './pages/AllCompetitions/AllCompetitions';
import { AdminLogin } from './components/Admin-Login/AdminLogin';
import UserpNew from './pages/UserProfile-new/UserpNew';
import Error from './pages/Error404/Error';
import './firebase'
import Nav from './components/Nav-new/Nav';
import Footer from './components/Footer/Footer';

const App = () => {
    return (
        <div className='app'>
            <Nav/>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/competition/:id' component={Competition}/>
                <Route exact path='/all-competitions' component={AllCompetitions}/>
                <Route path='/profile' component={Profile} />
                <Route path='/participation/:id' component={Participation} />
                <Route path='/user/username' component={UserpNew} />
                <Route path='/admin' component={AdminLogin} />
                <Route path='/admin-panel' component={Admin} />
                <Route path='/login' component={Login} />
                <Route path='*' component={Error} />
            </Switch>
            <Footer/>           
        </div>
    )
}

export default App;
