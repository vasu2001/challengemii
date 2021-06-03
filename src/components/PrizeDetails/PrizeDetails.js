import React from 'react';
import './prizeDetails.css';
import img from '../../assets/tshirt.jpeg';
import coins from '../../assets/coins.png';
import { AiOutlineClose } from 'react-icons/ai';
const PrizeDetails = ({ setDisplay }) => {
   return (
      <div className="prize_details">
         <div className="prize_details_container">
            <div className="details_head_box">
               <img src={img}></img>
               <div>
                  <p>FLAT DISCOUNT Rs.400</p>
                  <p>on Hammer KO</p>
               </div>
            </div>
            <h5>
               AVAILABLE SIZES: <span>30, 32, 34, 36</span>
            </h5>
            <h5>
               COLOURS: <span>Black, Red</span>
            </h5>
            <div className="details_action_box">
               <h6>Do you want to redeem coins for this coupons?</h6>
               <p>Coins once redeemed will not be refunded.</p>
               <a className="btn_detail_redeem">
                  Redeem For{' '}
                  <span>
                     <img src={coins}></img>
                  </span>
                  350
               </a>
            </div>
            <div className="btn-close" onClick={setDisplay}>
               <AiOutlineClose />
            </div>
         </div>
      </div>
   );
};

export default PrizeDetails;
