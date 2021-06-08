import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Basic from '../../components/Basic-info/Basic';
import Top from '../../components/Profile-top/Top';
import './profile.css';
import ManageCoins from '../../components/Manage-coins/ManageCoins';
import firebase from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../Auth';
import { motion } from 'framer-motion';

const db = firebase.firestore();

const Profile = (props) => {
   const { currentUser, userData: user } = useContext(AuthContext); // to get the id of current user
   // const [user,setUser] = useState({}); // to hold the data of user stored in firestore database

   if (!currentUser || !user) {
      return (
         <center>
            <h3>Loading...</h3>
         </center>
      );
   }
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.5 }}
      >
         <div className="profile">
            <div className="profile-container">
               <div className="nav-main">
                  <Switch>
                     <Route
                        exact
                        path="/profile/edit-profile"
                        render={() => (
                           <Fragment>
                              <Top
                                 title="Public profile"
                                 subtitle="Add information about yourself."
                              />
                              <Basic user={user} currentUser={currentUser} />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/profile/manage-coins"
                        render={() => (
                           <Fragment>
                              <Top
                                 title="Redeem Coins"
                                 subtitle="Get cash or exciting prizes "
                              />
                              <ManageCoins />
                           </Fragment>
                        )}
                     />
                  </Switch>
               </div>
            </div>
            {/* <Footer /> */}
         </div>
      </motion.div>
   );
};

export default Profile;
