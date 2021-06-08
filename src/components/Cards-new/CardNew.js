import React from 'react';
import './cardNew.css';
import trophy from '../../assets/trophy.png';
import population from '../../assets/population.png';
import calendar from '../../assets/calendar.png';
import clock from '../../assets/clock.png';
import money from '../../assets/money.png';
import moment from 'moment';
import ticket from '../../assets/ticket.png';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

const CardNew = (props) => {
   const competition = props.competition.data;
   const competition_id = props.competition.id;

   if (competition) {
      return (
         <Fade bottom>
            <div>
               <Link
                  to={{
                     pathname: `/competition/${competition_id}`,
                     state: competition,
                  }}
               >
                  <div className="card-new">
                     <div className="card-photo">
                        <img src={competition.photoUrl}></img>
                     </div>
                     <div className="card-new-container">
                        <h3 className="card-new-title">{competition.title}</h3>
                        <div
                           className="card-main-container long-time"
                           style={{ marginTop: '10px' }}
                        >
                           <img
                              className="prizeImg"
                              alt="Prize"
                              src={clock}
                              style={{
                                 marginRight: '8px',
                                 width: '20px',
                                 height: '20px',
                              }}
                           />
                           <p>
                              {moment(competition.starts).format('Do MMM,YYYY')}{' '}
                              - {moment(competition.ends).format('Do MMM,YYYY')}
                           </p>
                        </div>
                        <p className="short-time" style={{ marginTop: '10px' }}>
                           Starts:{' '}
                           {moment(competition.starts).format('Do, MMM')}
                        </p>
                        <p className="short-time">
                           Ends: {moment(competition.ends).format('Do, MMM')}
                        </p>
                        <div
                           className="card-main-container entry-sec"
                           style={{ marginTop: '10px' }}
                        >
                           <img
                              className="prizeImg cd-nw-img"
                              alt="Prize"
                              src={money}
                              style={{
                                 marginRight: '8px',
                                 width: '20px',
                                 height: '20px',
                              }}
                           />
                           <p>Entry: {competition.fees}</p>
                        </div>
                        <div className="card-new-footer">
                           <div className="bottom-container">
                              <img
                                 className="prizeImg cd-nw-img"
                                 alt="Prize"
                                 src={trophy}
                                 style={{ marginRight: '8px' }}
                              />
                              <p>
                                 : {competition.prize.reduce((a, b) => a + b)}
                              </p>
                           </div>
                           <div className="bottom-container registered-sec">
                              <img
                                 className="prizeImg cd-nw-img"
                                 alt="Prize"
                                 src={population}
                                 style={{ marginRight: '8px' }}
                              />
                              <p>: {competition.submissions} Registered</p>
                           </div>
                           <div className="bottom-container">
                              <img
                                 className="prizeImg cd-nw-img"
                                 alt="Prize"
                                 src={calendar}
                                 style={{ marginRight: '8px' }}
                              />
                              <p>
                                 :
                                 {moment().diff(competition.starts) > 0
                                    ? 'Started'
                                    : moment(competition.starts).fromNow()}
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="btn-live">
                        <img src={ticket} style={{ width: '25px' }}></img>{' '}
                        {competition.fees} tickets
                     </div>
                  </div>
               </Link>
            </div>
         </Fade>
      );
   } else {
      return (
         <center>
            <h3>Loading Competitions</h3>
         </center>
      );
   }
};

export default CardNew;
