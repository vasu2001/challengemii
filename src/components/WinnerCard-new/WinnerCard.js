import React, { useState, useEffect } from 'react';
import './winnerCard.css';
import girl from '../../assets/girl.jpg';
import prof from '../../assets/user.png';
import first from '../../assets/first-prize.png';
import second from '../../assets/second-prize.png';
import third from '../../assets/third-prize.png';
import firebase from '../../firebase';

const db = firebase.firestore();

const WinnerCard = ({ data }) => {
   const [photoUrl, setPhotoUrl] = useState([]);
   console.log(data);

   useEffect(() => {
      let sub_ids = [];
      let photoLink = [];
      data.winners.map((winner) => {
         sub_ids.push(winner.submission_id);
      });
      for (var i = 0; i < sub_ids.length; i++) {
         console.log(sub_ids[i]);
         db.collection('submissions')
            .doc(sub_ids[i])
            .get()
            .then((doc) => {
               setPhotoUrl((prevState) => [
                  ...prevState,
                  doc.data().photo_link,
               ]);
            });
      }
   }, []);

   console.log(photoUrl);

   return (
      <div className="ld-new-top-container wc">
         <h2 className="submission-title" style={{ color: 'white' }}>
            {data.comp_title}
         </h2>
         <div className="ld-winners-container">
            <div className="winner-pos-2">
               <img src={photoUrl[1]} class="runnerUp-img"></img>
               <p>{data.winners[1].name}</p>
               <p style={{ marginTop: '5px' }} className="wc-wins">
                  <img src={second} class="wc-icons"></img>
                  {data.prize[1]}
               </p>
            </div>
            <div className="winner-pos-1">
               <img src={photoUrl[0]} class="winner-img"></img>
               <p>{data.winners[0].name}</p>
               <p style={{ marginTop: '5px' }} className="wc-wins">
                  <img src={first} class="wc-icons"></img>
                  {data.prize[0]}
               </p>
            </div>
            <div className="winner-pos-3">
               <img src={photoUrl[2]} class="runnerUp-img last-pos"></img>
               <p>{data.winners[2].name}</p>
               <p style={{ marginTop: '5px' }} className="wc-wins">
                  <img src={third} class="wc-icons"></img>
                  {data.prize[2]}
               </p>
            </div>
         </div>
      </div>
   );
};

export default WinnerCard;
