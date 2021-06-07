import React, { useState, useEffect, useContext } from 'react';
import './nav.css';
import coinImg from '../../assets/coins.png';
import ticketImg from '../../assets/ticket.png';
import { Link, NavLink } from 'react-router-dom';
import { VscTriangleDown } from 'react-icons/vsc';
import { BsFillTriangleFill } from 'react-icons/bs';
import { AuthContext } from '../../Auth';
import firebase from '../../firebase';
const db = firebase.firestore(); //getting firestore

const Nav = () => {
   const { currentUser, setCurrentUser, setUserData, userData } =
      useContext(AuthContext);
   const [display, setDisplay] = useState(false);

   useEffect(() => {
      const unsubsribe = firebase.auth().onAuthStateChanged(async (user) => {
         if (user) {
            const userDoc = await firebase
               .firestore()
               .collection('users')
               .doc(user.uid)
               .get();
            if (userDoc.exists) {
               setUserData(userDoc.data());
            } else {
               // saving user in database if no user exists with the same uid.
               const newUserData = {
                  name: user.displayName,
                  photoURL: user.photoURL,
                  coins: 0,
                  tickets: 0,
                  desc: '',
                  website: '',
                  twitter: '',
                  instagram: '',
                  facebook: '',
                  linkedin: '',
               };
               await db.collection('users').doc(user.uid).set(newUserData);
               setUserData(newUserData);
            }

            setCurrentUser(user); // updating currentUser state of Auth context
         } else console.log('no user found');
      });

      return () => {
         unsubsribe();
      };
   }, []);

   if (!currentUser) {
      return (
         <div className="nav" id="nouser">
            <Link to="/">
               <p className="logo">Challengemii</p>
            </Link>
            <ul>
               <NavLink to="/all-competitions">
                  <li id="competition-navtext">Competitions</li>
               </NavLink>
               <NavLink to="/sign-in">
                  <li className="btn btn-signin">Sign in</li>
               </NavLink>
            </ul>
         </div>
      );
   } else {
      return (
         <div className="nav">
            <Link to="/">
               <p className="logo">Challengemii</p>
            </Link>
            <ul>
               <NavLink to="/all-competitions">
                  <li id="competitions-navtext">Competitions</li>
               </NavLink>
               <NavLink to="/manage-tickets">
                  <li id="buy-navtext">Buy Tickets</li>
               </NavLink>
               <NavLink to="/profile/manage-coins">
                  <li id="redeem-navtext">Redeem Coins</li>
               </NavLink>
               <NavLink to="/manage-tickets">
                  <li className="ticket-text">
                     <img
                        src={ticketImg}
                        className="nav-ticket-img"
                        alt=""
                     ></img>
                     <span>{userData.tickets}</span>
                  </li>
               </NavLink>
               <NavLink to="/profile/manage-coins">
                  <li className="coin-text">
                     <img src={coinImg} className="nav-coin-img" alt=""></img>
                     <span>{userData.coins}</span>
                  </li>
               </NavLink>
               <NavLink to="/user/me">
                  <div
                     className="nav-profile"
                     style={{ backgroundImage: `url(${userData.photoURL})` }}
                  ></div>
               </NavLink>
               <VscTriangleDown
                  className="drop-triangle"
                  onClick={() => setDisplay(!display)}
               />
               <div className={display ? 'drop-box' : 'hide'}>
                  <BsFillTriangleFill className="upward-tri" />
                  <ul>
                     <li>View Profile</li>
                     <li id="drop-buy">Buy Tickets</li>
                     <li id="drop-redeem">Redeem Coins</li>
                  </ul>
               </div>
            </ul>
         </div>
      );
   }
};

export default Nav;
