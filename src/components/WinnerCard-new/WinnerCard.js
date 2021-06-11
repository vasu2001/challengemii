import React, { useState, useEffect } from 'react';
import './winnerCard.css';
import girl from '../../assets/girl.jpg';
import prof from '../../assets/user.png';
import first from '../../assets/first-prize.png';
import second from '../../assets/second-prize.png';
import third from '../../assets/third-prize.png';
import firebase from '../../firebase';

const WinnerCard = ({ data }) => {
   const [photoUrl, setPhotoUrl] = useState('');

   console.log(data);

   useEffect(() => {}, []);

   return (
      <div className="ld-new-top-container wc">
         <h2 className="submission-title" style={{ color: 'white' }}>
            Hack the Space.
         </h2>
         <div className="ld-winners-container">
            <div className="winner-pos-2">
               <img src={prof} class="runnerUp-img"></img>
               <p>Krishna Saxena</p>
               <p>355</p>
               <p style={{ marginTop: '5px' }} className="wc-wins">
                  <img src={second} class="wc-icons"></img>800
               </p>
            </div>
            <div className="winner-pos-1">
               <img src={girl} class="winner-img"></img>
               <p>Vasu Aggrawal</p>
               <p>335</p>
               <p style={{ marginTop: '5px' }} className="wc-wins">
                  <img src={first} class="wc-icons"></img>1200
               </p>
            </div>
            <div className="winner-pos-3">
               <img src={prof} class="runnerUp-img last-pos"></img>
               <p>Aviral Tanwar</p>
               <p>318</p>
               <p style={{ marginTop: '5px' }} className="wc-wins">
                  <img src={third} class="wc-icons"></img>700
               </p>
            </div>
         </div>
      </div>
   );
};

export default WinnerCard;
