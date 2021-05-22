import React, { useEffect, useState } from 'react';
import './card.css';

import money from '../../assets/money.png';
import skills from '../../assets/skills.png';
import trophy from '../../assets/trophy.png';
import population from '../../assets/population.png';
import calendar from '../../assets/calendar.png';
import firebase from '../../firebase';
import moment from 'moment';
import { Link } from 'react-router-dom';

const db = firebase.firestore();

const Card = (props) => {
   // console.log(props.id);
   const [competition, setCompetitions] = useState({});

   useEffect(() => {
      db.collection('competitions')
         .doc(props.id)
         .get()
         .then((doc) => {
            if (doc.exists) {
               setCompetitions(doc.data());
            }
         });
   }, [props.id]);

   if (competition) {
      return (
         <div className="info-container">
            <div className="side-1">
               <div className="upper">
                  <p style={{ fontSize: '28px', marginBottom: '5px' }}>
                     {competition.title}
                  </p>
                  <p style={{ marginLeft: '3px' }}>{competition.tagline}</p>
               </div>
               <div className="time-stamp-container">
                  <p className="time-stamp">
                     {moment(competition.starts).format('Do MMM,YYYY h:mm a')} -{' '}
                     {moment(competition.ends).format('Do MMM,YYYY h:mm a')}
                  </p>
               </div>
               <div className="date-time">
                  <p style={{ fontSize: '16px', marginLeft: '20px' }}>
                     Start:
                     <span
                        style={{
                           fontSize: '14px',
                           marginLeft: '10px',
                           color: '#454545',
                        }}
                     >
                        {competition.starts}
                     </span>
                  </p>
                  <p
                     style={{
                        fontSize: '16px',
                        marginLeft: '20px',
                        marginBottom: '15px',
                     }}
                  >
                     End:
                     <span
                        style={{
                           fontSize: '14px',
                           marginLeft: '10px',
                           color: '#454545',
                        }}
                     >
                        {competition.ends}
                     </span>
                  </p>
               </div>
               <div className="lower">
                  <div className="lower-item">
                     <img className="prizeImg" alt="Prize" src={trophy} />
                     <p style={{ marginTop: '3px', marginLeft: '10px' }}>
                        Prize: <span>{competition.prize}</span>
                     </p>
                  </div>
                  <div className="lower-item">
                     <img className="prizeImg" alt="Prize" src={skills} />
                     <p style={{ marginTop: '3px', marginLeft: '10px' }}>
                        Eligible: <span>All</span>
                     </p>
                  </div>
                  <div className="lower-item">
                     <img className="prizeImg" alt="Prize" src={money} />
                     <p style={{ marginTop: '3px', marginLeft: '10px' }}>
                        Entry: <span>Rs. {competition.fees}</span>
                     </p>
                  </div>
               </div>
            </div>
            <div></div>
            <div className="side-2">
               <Link
                  to={'/participation/' + props.id}
                  className="btn btn-slide"
               >
                  Participate
               </Link>
               <div className="slide2-content">
                  <div className="slide2-item">
                     <img className="slideImg" alt="Prize" src={population} />
                     <p className="registered">{competition.submissions}</p>
                     <p
                        style={{ color: '#484848' }}
                        className="registered-text"
                     >
                        Registered
                     </p>
                  </div>
                  <div className="slide2-item">
                     <img className="slideImg" alt="Prize" src={calendar} />
                     <p className="registered">
                        {moment(competition.starts).fromNow(true)}
                     </p>
                     <p
                        style={{ color: '#484848' }}
                        className="registered-text"
                     ></p>
                  </div>
                  <div className="entry">Rs. {competition.fees}</div>
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

// const mapStateToProps = (state, ownProps) => {
//     const id = ownProps.id
//     const competitions = state.firestore.data.competitions;
//     const competition = competitions ? competitions[id]:null
//     console.log(competitions,competition);
//     return {
//         competition: competition
//     }
// }

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         {collection: 'competitions'}
//     ])
// )(Card)

export default Card;
