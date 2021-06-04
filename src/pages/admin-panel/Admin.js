import React, { Fragment } from 'react';
import Side from '../../components/Admin-side/Side';
// import Nav from '../../components/Nav-new/Nav';
import { Route, Switch } from 'react-router-dom';
import './admin.css';
import Top from '../../components/Profile-top/Top';
import HostCompetiton from '../../components/Host-competition/HostCompetiton';
import CompetitionStat from '../../components/Competition-Stat/CompetitionStat';
import Redeem from '../../components/Redeem-req/Redeem';
import AddPrize from '../../components/Add-Prize/AddPrize';
import UpdateCompetition from '../../components/UpdataCompetition/UpdateCompetition';

const Admin = () => {
   return (
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
                     exact
                     path="/admin-panel/update-comp"
                     render={() => (
                        <Fragment>
                           <Top title="Update Competitions" />
                           <UpdateCompetition />
                        </Fragment>
                     )}
                  />
               </Switch>
            </div>
         </div>
      </div>
   );
};

export default Admin;
