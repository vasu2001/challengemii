import React, { useState, useEffect } from 'react';
import './card.css';
import skills from '../../assets/skills.png';
import trophy from '../../assets/trophy.png';
import ticketImg from '../../assets/ticket.png';
import population from '../../assets/population.png';
import calendar from '../../assets/calendar.png';
import firebase from '../../firebase';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';

const db = firebase.firestore();

const Card = ({ competition, id }) => {
   if (competition) {
      return (
         <div className="cards">
            <div className="card_side_1">
               <h3>{competition.title}</h3>
               <h6 id="tagline">{competition.tagline}</h6>
               <p id="date-info">
                  {moment(competition.starts).format('Do MMM, YYYY')} -{' '}
                  {moment(competition.ends).format('Do MMM, YYYY')}
               </p>
               <div className="instruction-container">
                  <h5>Instructions:</h5>
                  <p>{competition.instructions}</p>
               </div>
               <div className="rules-container">
                  <h5>Rules:</h5>
                  <p>{competition.rules}</p>
               </div>
               <div className="extra-info">
                  <p>
                     <img className="img-extrainfo" src={trophy} alt=""></img>
                     <span>Prize: {competition.prize} coins</span>
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
               <div className="side2-actions">
                  <Link to={'/participation/' + id} id="btn-participate">
                     Participate
                  </Link>
                  <a id="btn-refer">Refer</a>
               </div>
               <div className="side2-info">
                  <p className="side2-registered">
                     <img src={population} alt="" className="img-side2"></img>
                     {competition.submissions} Registered
                  </p>
                  <p className="side2-time">
                     <img src={calendar} alt="" className="img-side2"></img>
                     {moment(competition.starts).fromNow()}
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
                        <span> {moment(competition.starts).fromNow()}</span>
                     </p>
                  </div>
               </div>
            </div>
         </div>
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
