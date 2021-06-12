import React from 'react';
import './banner.css';
import profDp from '../../assets/user.png';
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
                  Winners
               </Link>
               <Link to="/all-competitions" className="nav-link">
                  Competitions
               </Link>
               {user ? (
                  <NavLink to="/user/me">
                     <div
                        className="nav-profile"
                        style={{
                           backgroundImage: `url(${user.photoURL || profDp})`,
                           boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                           border: '2px solid #fff',
                        }}
                     ></div>
                  </NavLink>
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
