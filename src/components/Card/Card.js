import React, { useState, useEffect, useContext } from 'react';
import './card.css';
import skills from '../../assets/skills.png';
import trophy from '../../assets/trophy.png';
import ticketImg from '../../assets/ticket.png';
import population from '../../assets/population.png';
import calendar from '../../assets/calendar.png';
import firebase from '../../firebase';
import moment from 'moment';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Auth';
const db = firebase.firestore();

const Card = ({ competition, id, referBy }) => {
   const { currentUser, userData } = useContext(AuthContext);
   const history = useHistory();

   const compFees = parseInt(
      moment().diff(moment(competition.starts)) > 0
         ? competition.fees
         : competition.preregis,
   );

   const onRefer = async () => {
      try {
         const shareUrl = window.location + '?referBy=' + currentUser.uid;
         if (navigator.share) {
            navigator.share({
               url: shareUrl,
               title: 'Share with your friends to earn tickets',
            });
         } else {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('Share URL copied to clipboard');
         }
      } catch (err) {
         toast.error('Something went wrong');
      }
   };

   console.log(competition);
   if (competition) {
      return (
         <Fade bottom>
            <div className="cards">
               <div className="card_side_1">
                  <h3>{competition.title}</h3>
                  <h6 id="tagline">{competition.tagline}</h6>
                  <p id="date-info">
                     {moment(competition.starts).format('Do MMM, YYYY')} -{' '}
                     {moment(competition.ends).format('Do MMM, YYYY')}
                  </p>
                  <div className="instruction-container">
                     <p>{competition.desc}</p>
                  </div>
                  <div className="extra-info">
                     <p>
                        <img
                           className="img-extrainfo"
                           src={trophy}
                           alt=""
                        ></img>
                        <span>
                           Prize: {competition.prize?.reduce((a, b) => a + b)}{' '}
                           coins
                        </span>
                     </p>
                     <p>
                        <img
                           className="img-extrainfo"
                           src={population}
                           alt=""
                           style={{ transform: 'translateY(-7px)' }}
                        ></img>
                        <span>Registered: {competition.submissions}</span>
                     </p>
                     <p>
                        <img
                           className="img-extrainfo"
                           src={ticketImg}
                           alt=""
                        ></img>
                        <span>Entry: {competition.fees} tickets</span>
                     </p>
                  </div>
               </div>
               <div className="card_side_2">
                  {moment().diff(competition.ends) > 0 ? (
                     <center>
                        <h5 style={{ letterSpacing: '1px', marginTop: '10px' }}>
                           COMPETITION HAS ENDED
                        </h5>
                     </center>
                  ) : (
                     <div className="side2-actions">
                        <a
                           onClick={() => {
                              if (parseInt(userData.tickets) >= compFees)
                                 history.push({
                                    pathname: '/participation/' + id,
                                    state: { referBy, compFees },
                                 });
                              else toast.error('Not enough tickets');
                           }}
                           id="btn-participate"
                        >
                           Participate
                        </a>
                        <a id="btn-refer" onClick={onRefer}>
                           Refer <br />
                           <span>
                              to get {competition.refer} <img src={ticketImg} />
                           </span>
                        </a>
                     </div>
                  )}
                  <div className="side2-info">
                     <p className="side2-registered">
                        <img
                           src={population}
                           alt=""
                           className="img-side2"
                        ></img>
                        {competition.submissions}{' '}
                        {moment().diff(competition.ends) > 0
                           ? 'Participated'
                           : 'Registered'}
                     </p>
                     <p className="side2-time">
                        <img src={calendar} alt="" className="img-side2"></img>
                        {moment().diff(competition.starts) > 0 &&
                        moment().diff(competition.ends) > 0
                           ? 'Ended'
                           : moment().diff(competition.starts) > 0
                           ? 'Started'
                           : moment(competition.starts).fromNow()}
                     </p>
                     <div className="side2-top">
                        <p>
                           <img
                              className="img-extrainfo"
                              src={trophy}
                              alt=""
                           ></img>
                           <span>{competition.prize} coins</span>
                        </p>
                        <p>
                           <img
                              className="img-extrainfo"
                              src={ticketImg}
                              alt=""
                           ></img>
                           <span>{competition.fees} tickets</span>
                        </p>
                     </div>
                     <div className="side2-bottom">
                        <p>
                           <img
                              className="img-extrainfo"
                              src={population}
                              alt=""
                              style={{ transform: 'translateY(-7px)' }}
                           ></img>
                           <span>Registered: {competition.submissions}</span>
                        </p>
                        <p>
                           <img
                              className="img-extrainfo"
                              src={calendar}
                              alt=""
                           ></img>
                           <span>
                              {' '}
                              {moment().diff(competition.starts) > 0
                                 ? 'Started'
                                 : moment(competition.ends).fromNow()}
                           </span>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </Fade>
      );
   } else {
      return (
         <center>
            <div style={{ marginTop: '100px' }}>
               <h3>Loading competition...</h3>
            </div>
         </center>
      );
   }
};

export default Card;
