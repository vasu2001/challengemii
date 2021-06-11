import React from 'react';
import './banner.css';
import { Link, NavLink } from 'react-router-dom';
const Banner = (props) => {
   const user = props.user;
   return (
      <div className="home-banner">
         <div className="navbar">
            <h1 className="banner-logo">
               Challenge<span className="logo-secondary-part">mii</span>
            </h1>
            <div className="homenav-right">
               <Link to="/all-competitions" className="nav-link">
                  Competitions
               </Link>
               {user ? (
                  <Link
                     to="/user/me"
                     className="btn"
                     style={{ textTransform: 'none', color: 'white' }}
                  >
                     {user.displayName}
                  </Link>
               ) : (
                  <NavLink to="/sign-in">
                     <div className="hamburger-container">
                        <p>Sign In</p>
                     </div>
                  </NavLink>
               )}
            </div>
         </div>
         <div className="banner-titlebox">
            <h1 className="title-heading">
               Learn. Earn. <span id="title-heading">Compete.</span>
            </h1>
            <h1 className="title-heading-sub">
               Compete with the <span id="title-heading-sub">best.</span>
            </h1>
            <Link to="/all-competitions" className="btn btn-compete">
               Compete<span style={{ color: '#cd1010' }}> Now!</span>
            </Link>
         </div>
      </div>
   );
};

export default Banner;
