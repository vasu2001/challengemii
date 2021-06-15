import React, { useState, useEffect } from 'react';
import './winnerCard.css';
import { Link } from 'react-router-dom';
import first from '../../assets/first-prize.png';
import second from '../../assets/second-prize.png';
import third from '../../assets/third-prize.png';
import firebase from '../../firebase';

const db = firebase.firestore();

const WinnerCard = ({ data }) => {
   const [photoUrl, setPhotoUrl] = useState([]);
   // console.log(data);
   // const photoUrl = data.winners.map((x) => x.photo);

   useEffect(() => {
      const photoPromise = data.winners.map(({ user_id }) =>
         firebase.storage().ref(`users/${user_id}`).getDownloadURL(),
      );
      Promise.all(photoPromise).then(setPhotoUrl);
   }, [data]);

   // console.log(photoUrl);

   return (
      <Link className="wc-link" to={`/competition/${data.comp_id}`}>
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
                  <p>{data.winners[2]?.name}</p>
                  <p style={{ marginTop: '5px' }} className="wc-wins">
                     <img src={third} class="wc-icons"></img>
                     {data.prize[2]}
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default WinnerCard;
