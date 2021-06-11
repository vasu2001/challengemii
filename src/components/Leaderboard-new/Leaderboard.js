import React, { useEffect, useState } from 'react';
import './leaderboard.css';
import girl from '../../assets/girl.jpg';
import prof from '../../assets/user.png';
import uparrow from '../../assets/increase.png';
import firebase from '../../firebase';

const db = firebase.firestore();

const Leaderboard = ({ data }) => {
   const fetchDp = (id) => {
      return firebase.storage().ref(`dp/${id}`).getDownloadURL();
   };

   if (!data || data.length < 3) {
      return (
         <div className="nd-ld-container">
            <h4>Leaderboard will be revealed after atleast 3 submissions.</h4>
         </div>
      );
   } else {
      return (
         <div className="ld-new">
            <div className="ld-new-top-container">
               <h2 className="submission-title" style={{ color: 'white' }}>
                  LEADERBOARD
               </h2>
               <div className="ld-winners-container">
                  <div className="winner-pos-2">
                     <img src={data[1].photo_link} class="runnerUp-img"></img>
                     <p>{data[1].user_name.replace(/[^a-z]/gi, ' ')}</p>
                     <p>{data[1].vote}</p>
                  </div>
                  <div className="winner-pos-1">
                     <img src={data[0].photo_link} class="winner-img"></img>
                     <p>{data[0].user_name.replace(/[^a-z]/gi, ' ')}</p>
                     <p>{data[0].vote}</p>
                  </div>
                  <div className="winner-pos-3">
                     <img
                        src={data[2].photo_link}
                        class="runnerUp-img last-pos"
                     ></img>
                     <p>{data[2].user_name.replace(/[^a-z]/gi, ' ')}</p>
                     <p>{data[2].vote}</p>
                  </div>
               </div>
            </div>
            <div className="ld-new-bottom-container">
               <ul className="ld-list">
                  {data &&
                     data.map((sub, key) => {
                        return (
                           <li>
                              <div>
                                 <p>{key + 1}</p>
                                 <img
                                    src={fetchDp(sub.user_id)}
                                    style={{
                                       width: '50px',
                                       height: '50px',
                                       borderRadius: '50%',
                                    }}
                                 ></img>
                              </div>
                              <p class="li-name">
                                 {sub.user_name.replace(/[^a-z]/gi, ' ')}
                              </p>
                              <div>
                                 <p>{sub.vote}</p>
                                 <img
                                    src={uparrow}
                                    style={{
                                       width: '30px',
                                       height: '30px',
                                       marginLeft: '5px',
                                    }}
                                 ></img>
                              </div>
                           </li>
                        );
                     })}
               </ul>
            </div>
         </div>
      );
   }
};

export default Leaderboard;
