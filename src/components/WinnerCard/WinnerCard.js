import React, { useState, useEffect } from 'react';
import './winnerCard.css';
import medal from '../../assets/gold-medal.png';
import coins from '../../assets/coins.png';
import first from '../../assets/first-prize.png';
import second from '../../assets/second-prize.png';
import third from '../../assets/third-prize.png';
import { Link } from 'react-router-dom';

import firebase from '../../firebase';

const WinnerCard = ({ data }) => {
   const [photoUrl, setPhotoUrl] = useState('');
   // console.log(data);

   useEffect(() => {
      firebase
         .firestore()
         .collection('submissions')
         .doc(data.winners[0].submission_id)
         .get()
         .then((doc) => {
            setPhotoUrl(doc.data().photo_link);
         });
   }, []);

   return (
      <Link to={`/competition/${data.comp_id}`}>
         <div className="winner-card">
            <div className="wn-cd-thumbnail">
               <img src={photoUrl}></img>
            </div>
            <div className="wn-cd-content">
               <div className="wn-content-titlebox">
                  <h4>{data.comp_title}</h4>
                  <p>{data.comp_tagline}.</p>
               </div>
               <div className="winner-info">
                  <p>
                     <span>
                        <img src={medal} className="winner-icon"></img>
                     </span>
                     Winner: {data.winners[0].name}
                  </p>
               </div>
               <div className="wn-pz-info">
                  <p>
                     <span>
                        <img src={first}></img>
                     </span>
                     : {data.prize[0]}{' '}
                     <span>
                        <img src={coins}></img>
                     </span>
                  </p>
                  <p>
                     <span>
                        <img src={second}></img>
                     </span>
                     : {data.prize[1]}{' '}
                     <span>
                        <img src={coins}></img>
                     </span>
                  </p>
                  <p>
                     <span>
                        <img src={third}></img>
                     </span>
                     : {data.prize[2]}{' '}
                     <span>
                        <img src={coins}></img>
                     </span>
                  </p>
               </div>
               <div className="wn-cd-winnerList">
                  <p style={{ color: 'red' }}>
                     <span>
                        <img src={first}></img>
                     </span>
                     {data.winners[0].name}
                  </p>
                  <p>
                     <span>
                        <img src={second}></img>
                     </span>
                     {data.winners[1].name}
                  </p>
                  <p>
                     <span>
                        <img src={third}></img>
                     </span>
                     {data.winners[2].name}
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default WinnerCard;
