import React, { useEffect, useState } from 'react';
import './leaderboard.css';
import girl from '../../assets/girl.jpg';
import prof from '../../assets/user.png';
import uparrow from '../../assets/increase.png';
import firebase from '../../firebase';

const db = firebase.firestore();

const Leaderboard = ({ id }) => {
   const [subs, setSubs] = useState([]);

   useEffect(() => {
      db.collection('submissions')
         .where('competition_id', '==', id)
         .orderBy('vote', 'desc')
         .get()
         .then((querySnap) => {
            querySnap.forEach((doc) => {
               setSubs((prevState) => [...prevState, doc.data()]);
            });
         });
   }, []);

   const fetchDp = (id) => {
      return firebase.storage().ref(`dp/${id}`).getDownloadURL();
   };

   if (subs.length === 0) {
      return (
         <div className="">
            <h3>There is no submissions yet.</h3>
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
                     <img src={prof} class="runnerUp-img"></img>
                     {/* <p>{subs[1].user_name.replace(/[^a-z]/gi,' ')}</p> */}
                     {/* <p>{subs[1].vote}</p> */}
                  </div>
                  <div className="winner-pos-1">
                     <img src={girl} class="winner-img"></img>
                     {/* <p>{subs[0].user_name.replace(/[^a-z]/gi,' ')}</p> */}
                     {/* <p>{subs[0].vote}</p> */}
                  </div>
                  <div className="winner-pos-3">
                     <img src={prof} class="runnerUp-img last-pos"></img>
                     {/* <p>{subs[2].user_name.replace(/[^a-z]/gi,' ')}</p> */}
                     {/* <p>{subs[2].vote}</p> */}
                  </div>
               </div>
            </div>
            <div className="ld-new-bottom-container">
               <ul className="ld-list">
                  {subs &&
                     subs.map((sub, key) => {
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
