import React from 'react';
import { Link } from 'react-router-dom';
import './side.css';

const Side = () => {
   return (
      <div>
         <div className="admin-side-nav">
            <div className="admin-photo"></div>
            <h4 className="admin-name">Admin</h4>
            <ul className="admin-side-nav-items">
               <Link to="/admin-panel/host">
                  {' '}
                  <li className="admin-side-nav-links">Host Competition</li>
               </Link>
               <Link to="/admin-panel/stat">
                  {' '}
                  <li className="admin-side-nav-links">Competition Stats</li>
               </Link>
               <Link to="/admin-panel/redeem-req">
                  {' '}
                  <li className="admin-side-nav-links">Redeem requests</li>
               </Link>
               <Link to="/admin-panel/add-prize">
                  {' '}
                  <li className="admin-side-nav-links">Add prize</li>
               </Link>
            </ul>
         </div>
      </div>
   );
};

export default Side;
