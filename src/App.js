import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

import './App.css';
import './firebase';
import Competition from './pages/competition/Competition';
import Home from './pages/home/home';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin-panel/Admin';
import Login from './components/Login/Login';
import Participation from './pages/Participation/Participation';
import AllCompetitions from './pages/AllCompetitions/AllCompetitions';
import { AdminLogin } from './components/Admin-Login/AdminLogin';
import UserpNew from './pages/UserProfile-new/UserpNew';
import Error from './pages/Error404/Error';
import { AuthProvider } from './Auth';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import BottomNav from './components/Bottom-nav/BottomNav';
import 'react-toastify/dist/ReactToastify.css';
import ManageTickets from './pages/Manage-tickets/ManageTickets';
import ScrollToTop from './ScrollToTop';
import Winners from './pages/Winners/Winners';
import TnC from './pages/TnC/TnC';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';

const App = () => {
   return (
      <CookiesProvider>
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
               <AnimatePresence exitBeforeEnter>
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <Route path="/competition/:id" component={Competition} />
                     <Route path="/sign-in" component={Login} />
                     <Route
                        exact
                        path="/all-competitions"
                        component={AllCompetitions}
                     />
                     <Route exact path="/winners" component={Winners} />
                     <Route path="/profile" component={Profile} />
                     <Route
                        path="/participation/:id"
                        component={Participation}
                     />
                     <Route path="/user/:id" component={UserpNew} />
                     <Route path="/manage-tickets" component={ManageTickets} />
                     <Route path="/tnc" component={TnC} />
                     <Route path="/privacy-policy" component={PrivacyPolicy} />
                     <Route path="/admin" component={AdminLogin} />
                     <Route path="/admin-panel" component={Admin} />
                     <Route path="*" component={Error} />
                  </Switch>
               </AnimatePresence>
               <BottomNav />
               <Footer />
            </div>
         </AuthProvider>
      </CookiesProvider>
   );
};

export default App;
