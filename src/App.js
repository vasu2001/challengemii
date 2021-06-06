import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Competition from './pages/competition/Competition';
import Home from './pages/home/home';
import Profile from './pages/profile/Profile';
import './App.css';
import Admin from './pages/admin-panel/Admin';
import Login from './components/Login/Login';
import Participation from './pages/Participation/Participation';
import AllCompetitions from './pages/AllCompetitions/AllCompetitions';
import { AdminLogin } from './components/Admin-Login/AdminLogin';
import UserpNew from './pages/UserProfile-new/UserpNew';
import Error from './pages/Error404/Error';
import './firebase';
import { AuthProvider } from './Auth';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import BottomNav from './components/Bottom-nav/BottomNav';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ManageTickets from './pages/Manage-tickets/ManageTickets';
import ScrollToTop from './ScrollToTop';
import { AnimatePresence } from 'framer-motion';

const App = () => {
   return (
      <AuthProvider>
         <div className="app">
            <ToastContainer
               position="top-center"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick={true}
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
            <Nav />
            <ScrollToTop />
            <AnimatePresence exitBeforeEnter initial={false}>
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/competition/:id" component={Competition} />
                  <Route path="/sign-in" component={Login} />
                  <Route
                     exact
                     path="/all-competitions"
                     component={AllCompetitions}
                  />
                  <Route path="/profile" component={Profile} />
                  <Route path="/participation/:id" component={Participation} />
                  <Route path="/user/:id" component={UserpNew} />
                  <Route path="/manage-tickets" component={ManageTickets} />
                  <Route path="/admin" component={AdminLogin} />
                  <Route path="/admin-panel" component={Admin} />
                  <Route path="*" component={Error} />
               </Switch>
            </AnimatePresence>
            <BottomNav />
            <Footer />
         </div>
      </AuthProvider>
   );
};

export default App;
