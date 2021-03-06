import React, { Fragment, useContext, useEffect, useState } from 'react';
import Side from '../../components/Admin-side/Side';
// import Nav from '../../components/Nav-new/Nav';
import { Route, Switch, useHistory } from 'react-router-dom';
import './admin.css';
import Top from '../../components/Profile-top/Top';
import HostCompetiton from '../../components/Host-competition/HostCompetiton';
import CompetitionStat from '../../components/Competition-Stat/CompetitionStat';
import Redeem from '../../components/Redeem-req/Redeem';
import AddPrize from '../../components/Add-Prize/AddPrize';
import UpdateCompetition from '../../components/UpdataCompetition/UpdateCompetition';
import AdminGeneral from '../../components/AdminGeneral/AdminGeneral';
import { motion } from 'framer-motion';
import ReportedSubs from '../../components/ReportedSubs/ReportedSubs';
import UpdateUserInfo from '../../components/UpdateUserInfo/UpdateUserInfo';
import CoinsReq from '../../components/CoinsReq/CoinsReq';
import { AuthContext } from '../../Auth';
import firebase from '../../firebase';
import DelPrize from '../../components/DelPrize/DelPrize';

const Admin = () => {
   const { currentUser } = useContext(AuthContext);
   const history = useHistory();

   const [allow, setAllow] = useState(false);

   useEffect(() => {
      if (!currentUser) {
         history.push('/admin');
      } else {
         currentUser.getIdTokenResult().then((idTokenResult) => {
            if (!!idTokenResult.claims.admin) {
               setAllow(true);
            } else {
               firebase.auth().signOut();
            }
         });
      }
   }, [currentUser]);

   // if (currentUser?.providerId !== 'firebase') {
   //    // if (currentUser)
   //    firebase
   //       .auth()
   //       .signOut()
   //       .then(() => {
   //          history.push('/admin');
   //       });
   // }

   return allow ? (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.5 }}
      >
         <div>
            <div className="admin-container">
               <Side />
               <div className="nav-main">
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/host"
                        render={() => (
                           <Fragment>
                              <Top title="Host a Competition" />
                              <HostCompetiton />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/stat"
                        render={() => (
                           <Fragment>
                              <Top title="Competition Stats" />
                              <CompetitionStat />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/redeem-req"
                        render={() => (
                           <Fragment>
                              <Top title="Redeem Requests" />
                              <Redeem />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/coins-req"
                        render={() => (
                           <Fragment>
                              <Top title="Coins Requests" />
                              <CoinsReq />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/add-prize"
                        render={() => (
                           <Fragment>
                              <Top title="Add Prize" />
                              <AddPrize />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        path="/admin-panel/update-comp/:id"
                        render={() => (
                           <Fragment>
                              <Top title="Update Competitions" />
                              <UpdateCompetition />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/general"
                        render={() => (
                           <Fragment>
                              <Top title="General Updations" />
                              <AdminGeneral />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/reported-subs"
                        render={() => (
                           <Fragment>
                              <Top title="Reported Submissions" />
                              <ReportedSubs />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/update-user"
                        render={() => (
                           <Fragment>
                              <Top title="Update User Info" />
                              <UpdateUserInfo />
                           </Fragment>
                        )}
                     />
                  </Switch>
                  <Switch>
                     <Route
                        exact
                        path="/admin-panel/delete-prize"
                        render={() => (
                           <Fragment>
                              <Top title="Delete Prize" />
                              <DelPrize />
                           </Fragment>
                        )}
                     />
                  </Switch>
               </div>
            </div>
         </div>
      </motion.div>
   ) : (
      <p>loading</p>
   );
};

export default Admin;
