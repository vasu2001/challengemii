import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import moment from 'moment';
import RedeemDetails from '../Redeem-Details/RedeemDetails';
import { toast } from 'react-toastify';

const db = firebase.firestore();

const Redeem = () => {
   const [display, setDisplay] = useState(false);
   const [requests, setRequests] = useState([]);
   const [details, setDetails] = useState(-1);

   useEffect(() => {
      db.collection('redeem_req')
         .get()
         .then((querySnap) => {
            setRequests(
               querySnap.docs
                  .map((doc) => ({ id: doc.id, ...doc.data() }))
                  .filter((x) => !x.completed),
            );
         });
   }, []);

   const done = async (req_id) => {
      try {
         await db.collection('redeem_req').doc(req_id).update({
            completed: true,
         });
         toast.success('Record marked as completed in database !');
      } catch (err) {
         console.log(err);
         toast.error('Unable to proccess the request !');
      }
   };

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
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {requests.map((request, index) => {
                     const { id, name, date, user_id } = request;
                     return (
                        <tr key={index}>
                           <td data-column="Name">{name}</td>
                           <td data-column="UserId">{user_id}</td>
                           <td data-column="Date">
                              {moment(date).format('DD/MM/YYYY, hh:mm a')}
                           </td>
                           <td data-column="details">
                              <a
                                 className=""
                                 style={{ cursor: 'pointer' }}
                                 onClick={() => setDetails(index)}
                              >
                                 Details
                              </a>
                           </td>
                           <td data-column="details">
                              <a
                                 onClick={(req_id) => done(id)}
                                 className=""
                                 style={{ cursor: 'pointer' }}
                              >
                                 Done
                              </a>
                           </td>
                        </tr>
                     );
                  })}
                  {details > -1 ? (
                     <RedeemDetails
                        close={setDetails}
                        data={requests[details]}
                     />
                  ) : null}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Redeem;
