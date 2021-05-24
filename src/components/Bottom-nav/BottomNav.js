import React, { useContext } from 'react';
import './bottomNav.css';
import userImg from '../../assets/user.png';
import coinImg from '../../assets/coins.png';
import ticketImg from '../../assets/ticket.png';
import competitionImg from '../../assets/competition.png';
import { AuthContext } from '../../Auth';
import { Link, NavLink } from 'react-router-dom';

const BottomNav = () => {
   const {
      currentUser,
      setCurrentUser,
      userData: user,
   } = useContext(AuthContext);

   if (!currentUser || !user) {
      return (
         <div className="bottom-nav">
            <Link to="/sign-in">
               <div className="item-box">
                  <img
                     src={competitionImg}
                     alt=""
                     className="bottom-nav-icons"
                  ></img>
                  Competitions
               </div>
            </Link>
            <Link to="/sign-in">
               <div className="item-box">
                  <img
                     src={ticketImg}
                     alt=""
                     className="bottom-nav-icons"
                  ></img>
                  Buy
               </div>
            </Link>
            <Link to="/sign-in">
               <div className="item-box">
                  <img src={coinImg} alt="" className="bottom-nav-icons"></img>
                  Redeem
               </div>
            </Link>
            <Link to="/sign-in">
               <div className="item-box">
                  <img src={userImg} alt="" className="bottom-nav-icons"></img>
                  Profile
               </div>
            </Link>
         </div>
      );
   } else {
      return (
         <div className="bottom-nav">
            <NavLink to="/all-competitions">
               <div className="item-box">
                  <img src={competitionImg} className="bottom-nav-icons"></img>
                  Competitions
               </div>
            </NavLink>
            <NavLink to="/manage-tickets">
               <div className="item-box ticket-container">
                  {/* <div className="tickets">{user.tickets}</div> */}
                  <img
                     src={ticketImg}
                     alt=""
                     className="bottom-nav-icons"
                  ></img>
                  Buy
               </div>
            </NavLink>
            <NavLink to="/profile/manage-coins">
               <div className="item-box coin-container">
                  {/* <div className="coins">{user.coin}</div> */}
                  <img src={coinImg} alt="" className="bottom-nav-icons"></img>
                  Redeem
               </div>
            </NavLink>
            <NavLink to="/user/username">
               <div className="item-box">
                  <img
                     src={currentUser.photoURL}
                     alt=""
                     className="bottom-nav-icons profile-icon"
                  ></img>
                  Profile
               </div>
            </NavLink>
         </div>
      );
   }
};

export default BottomNav;
