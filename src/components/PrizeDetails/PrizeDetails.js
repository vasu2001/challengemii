import React from 'react';
import './prizeDetails.css';
import img from '../../assets/tshirt.jpeg';
import coins from '../../assets/coins.png';
import { AiOutlineClose } from 'react-icons/ai';

const PrizeDetails = ({ onRedeem, close, data }) => {
   console.log(data);

   return (
      <div className="prize_details">
         <div className="prize_details_container">
            <div className="details_head_box">
               <img src={data.image}></img>
               <div>
                  <p>{data.name}</p>
               </div>
            </div>
            <div style={{ maxHeight: '463px', overflow: 'auto' }}>
               <div className="pd-content">
                  <div className="pd-ct-left">
                     <p>{data.description}</p>
                  </div>
                  <div className="pd-ct-right">
                     <img src={data.image} style={{ width: '250px' }}></img>
                  </div>
               </div>
               <div className="pd-actions">
                  <h6>Do you want to redeem coins for this item?</h6>
                  <p>Coins once redeemed will not be refunded.</p>
                  <a className="btn_detail_redeem" onClick={onRedeem}>
                     Redeem For{' '}
                     <span>
                        <img src={coins}></img>
                     </span>
                     {data.coins}
                  </a>
               </div>
            </div>
            <div className="btn-close" onClick={close}>
               <AiOutlineClose />
            </div>
         </div>
      </div>
   );
};

export default PrizeDetails;
