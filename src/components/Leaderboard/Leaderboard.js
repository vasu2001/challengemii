import React, { useEffect, useState } from 'react';
import './leaderboard.css';
import firebase from '../../firebase';
import Fade from 'react-reveal/Fade';

const db = firebase.firestore();

const Leaderboard = (props) => {
   const [mySubs, setMySubs] = useState([]);

   useEffect(() => {
      db.collection('submissions')
         .where('competition_id', '==', props.id)
         .orderBy('vote', 'desc')
         .get()
         .then((querySnap) => {
            querySnap.forEach((doc) => {
               setMySubs((prevState) => [...prevState, doc.data()]);
            });
         });
   }, []);

   return (
      <div className="leaderboard-ct">
         <h2 className="submission-title">LEADERBOARD</h2>
         <div className="leaderboard">
            <ol>
               {mySubs == '' ? (
                  <center>
                     <p>There is no submission yet.</p>
                  </center>
               ) : null}
               {mySubs &&
                  mySubs.map((mySub, key) => {
                     return (
                        <li
                           style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                           }}
                        >
                           <span>{key + 1}</span>
                           {mySub.user_name}{' '}
                           <span style={{ marginRight: '10px' }}>
                              {mySub.vote}
                           </span>
                        </li>
                     );
                  })}
            </ol>
         </div>
      </div>
   );
};

export default Leaderboard;
