import React, { useEffect, useState } from 'react';
import './voteScreen.css';
import firebase from '../../firebase';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';

const VoteScreen = ({ comp_id }) => {
   const [subs, setSubs] = useState([]);

   useEffect(() => {
      firebase
         .firestore()
         .collection('submissions')
         .where('competition_id', '==', comp_id)
         .orderBy('vote', 'desc')
         .get()
         .then((querySnap) => {
            setSubs(
               querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            );
         });
   }, [comp_id]);
   console.log(subs);

   const updateBtn = (i) => {
      firebase
         .firestore()
         .collection('submissions')
         .doc(subs[i].id)
         .update({
            vote: subs[i].vote,
         })
         .then(() => toast.success('Updated successfully !'))
         .catch((err) => {
            toast.error('Error updating votes.');
         });
   };

   const handleChange = (e, i) => {
      const newSubs = [...subs];
      newSubs[i] = { ...subs[i] };
      newSubs[i].vote = parseInt(e.target.value ?? 0);
      setSubs(newSubs);
   };

   return (
      <div className="vote-screen">
         <h3>Participants Votes</h3>
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Name</th>
                  <th>User Id</th>
                  <th>Votes</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {subs &&
                  subs.map((sub, key) => {
                     return (
                        <tr key={key}>
                           <td data-column="">{key + 1}</td>
                           <td data-column="Name">{sub.user_name}</td>
                           <td data-column="User Id">{sub.user_id}</td>
                           {/* <td data-column="Votes">{sub.vote}</td> */}
                           <td data-column="Votes">
                              <input
                                 onChange={(e) => handleChange(e, key)}
                                 defaultValue={sub.vote}
                                 className="vote-update-input"
                              ></input>
                           </td>
                           <td data-column="Votes">
                              <a
                                 className=""
                                 style={{ cursor: 'pointer' }}
                                 onClick={() => updateBtn(key)}
                              >
                                 Update
                              </a>
                           </td>
                        </tr>
                     );
                  })}
            </tbody>
         </table>
      </div>
   );
};

export default VoteScreen;
