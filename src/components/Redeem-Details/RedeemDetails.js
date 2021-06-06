import React from 'react';
import './redeemDetails.css';
import { BsArrowRight } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import Fade from 'react-reveal/Fade';

const RedeemDetails = ({ close }) => {
   return (
      <div className="redeem-details">
         <div className="redeem-details-card">
            <a className="redeem-details-close" onClick={close}>
               <GrClose />
            </a>
            <h3>Prize Details</h3>
            <div className="detail-box">
               <p>
                  Name:<span>Vasu</span>
               </p>
               <p>
                  Prize Title:<span>Coffee mug</span>
               </p>
               <p>
                  Prize coins:<span>100 coins</span>
               </p>
            </div>
            <h4>Questions</h4>
            <div className="quest-box">
               <ul>
                  <li className="quest">
                     <span>Q.1)</span>What's the size?
                  </li>
                  <li className="ans">
                     <span>
                        <BsArrowRight />
                     </span>
                     38
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default RedeemDetails;
