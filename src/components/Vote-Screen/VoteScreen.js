import React, { useEffect, useState } from 'react';
import './voteScreen.css';
import firebase from '../../firebase';
import Loading from '../Loading/Loading';

const VoteScreen = ({ comp_id }) => {
   const [subs, setSubs] = useState([]);
   const [vote, setVote] = useState(0);

   useEffect(() => {
      firebase
         .firestore()
         .collection('submissions')
         .where('competition_id', '==', comp_id)
         .orderBy('vote', 'desc')
         .get()
         .then((querySnap) => {
            setSubs(querySnap.docs.map((doc) => doc.data()));
         });
   }, [comp_id]);
   console.log(subs);

   const updateBtn = (user_id) => {
      firebase
         .firestore()
         .collection('submissions')
         .where('competition_id', '==', comp_id)
         .where('user_id', '==', user_id)
         .get()
         .then((querySnap) => {
            querySnap.forEach((doc) => {
               doc.ref.update({
                  vote,
               });
            });
         });
   };

   const handleChange = (e) => {
      setVote(e.target.value);
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
                                 onChange={(e) => handleChange(e)}
                                 defaultValue={sub.vote}
                                 className="vote-update-input"
                              ></input>
                           </td>
                           <td data-column="Votes">
                              <a
                                 className=""
                                 style={{ cursor: 'pointer' }}
                                 onClick={(user_id) => updateBtn(sub.user_id)}
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
