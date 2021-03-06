import React, { useState } from 'react';
import './prizeBox.css';
import coins from '../../assets/coin.png';
import PrizeDetails from '../PrizeDetails/PrizeDetails';
import Fade from 'react-reveal/Fade';

const PrizeBox = ({ data, onRedeem }) => {
   const [display, setDisplay] = useState(false);

   const closePrizeDetails = () => {
      setDisplay(false);
   };
   return (
      <Fade bottom>
         <div className="prize-box">
            {display ? <PrizeDetails setDisplay={closePrizeDetails} /> : null}
            <div className="img-holder">
               <img src={data.image}></img>
            </div>
            <div className="prize-info">
               <div className="title-holder">
                  <p className="prize-title">{data.name}</p>
               </div>
               <p>{data.description}</p>
            </div>
            <a className="btn-add" onClick={onRedeem}>
               Redeem{' '}
               <span>
                  <img src={coins} className="prize-value"></img>
                  {data.coins}
               </span>
            </a>
            <div className="circle"></div>
            <div className="circle rightc"></div>
         </div>
      </Fade>
   );
};

export default PrizeBox;
