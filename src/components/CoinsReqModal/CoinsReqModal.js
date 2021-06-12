import React, { useState } from 'react';
import './coinsReqModal.css';
import { GrClose } from 'react-icons/gr';
import { BsConeStriped } from 'react-icons/bs';

const CoinsReqModal = ({ data, close, onPay }) => {
   // console.log(data);

   return (
      <div className="coins-req-modal">
         <div className="cr-md-box">
            <a className="redeem-details-close" onClick={close}>
               <GrClose />
            </a>
            <h4>Winners</h4>
            <table>
               <thead>
                  <tr>
                     <th></th>
                     <th>UserId</th>
                     <th>Name</th>
                     <th>Prize</th>
                  </tr>
               </thead>
               <tbody>
                  {data &&
                     data.submissions
                        .slice(0, data.prize.length)
                        .map((sub, i) => {
                           return (
                              <tr key={i}>
                                 <td data-column="">{i + 1}</td>
                                 <td data-column="UserId">{sub.user_id}</td>
                                 <td data-column="Name">{sub.user_name}</td>
                                 <td data-column="Prize">{data.prize[i]}</td>
                              </tr>
                           );
                        })}
               </tbody>
            </table>
            <a className="btn-payN" onClick={onPay}>
               Pay Now
            </a>
         </div>
      </div>
   );
};

export default CoinsReqModal;
