import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import moment from 'moment';
import RedeemDetails from '../Redeem-Details/RedeemDetails';

const db = firebase.firestore();

const Redeem = () => {
   // console.log(this.state.requests);
   const [display, setDisplay] = useState(false);
   const [requests, setRequests] = useState([]);

   useEffect(() => {
      db.collection('redeem_req')
         .get()
         .then((querySnap) => {
            setRequests(querySnap.docs.map((x) => ({ id: x.id, ...x.data() })));
         });
   }, []);

   return (
      <div>
         {display ? <RedeemDetails close={() => setDisplay(false)} /> : null}
         <div className="redeem">
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>UserId</th>
                     <th>Date</th>
                     <th>Details</th>
                  </tr>
               </thead>
               <tbody>
                  {requests.map((request, index) => {
                     const { id, name, date, user_id } = request;
                     return (
                        <tr key={id}>
                           <td data-column="Name">{name}</td>
                           <td data-column="Name">{user_id}</td>
                           <td data-column="Paytm/UPI Id">
                              {moment(date).format('DD/MM/YYYY, hh:mm a')}
                           </td>
                           <td data-column="details">
                              <a
                                 className=""
                                 style={{ cursor: 'pointer' }}
                                 onClick={() => setDisplay(true)}
                              >
                                 Details
                              </a>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Redeem;
