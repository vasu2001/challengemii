import React, { useEffect, useState } from 'react';
import './updateUserInfo.css';
import firebase from '../../firebase';
import { toast } from 'react-toastify';

const UpdateUserInfo = () => {
   const [users, setUsers] = useState([]);
   const [details, setDetails] = useState({
      coins: '',
      tickets: '',
   });
   useEffect(() => {
      firebase
         .firestore()
         .collection('users')
         .get()
         .then((querySnap) => {
            setUsers(
               querySnap.docs.map((doc) => ({
                  data: doc.data(),
                  id: doc.id,
               })),
            );
         });
   }, []);

   const handleChange = (e) => {
      setDetails({
         ...details,
         [e.target.id]: e.target.value,
      });
   };

   const submitUpdate = async (user_id) => {
      if (details.coins !== '' && details.tickets !== '') {
         try {
            await firebase
               .firestore()
               .collection('users')
               .doc(user_id)
               .update({
                  coins: details.coins,
                  tickets: details.tickets,
               })
               .then(toast.success('Updated successfully.'));
         } catch (err) {
            console.log(err);
            toast.error('Error updating document.');
         }
      } else {
         toast.error('Fill up fields to update.');
      }
   };

   console.log(details);
   return (
      <div className="update-user-info">
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>UserId</th>
                  <th>Email</th>
                  <th>Coins</th>
                  <th>Tickets</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {users &&
                  users.map((user, i) => {
                     return (
                        <tr key={i}>
                           <td data-column="Name">{user.data.name}</td>
                           <td data-column="UserId">{user.id}</td>
                           <td data-column="Email">krishnasaxena@gmail.com</td>
                           <td data-column="Coins">
                              <input
                                 id="coins"
                                 defaultValue={user.data.coins}
                                 onChange={(e) => handleChange(e)}
                                 className="vote-update-input"
                              ></input>
                           </td>
                           <td data-column="Tickets">
                              <input
                                 id="tickets"
                                 onChange={(e) => handleChange(e)}
                                 defaultValue={user.data.tickets}
                                 className="vote-update-input"
                              ></input>
                           </td>
                           <td data-column="Votes">
                              <a
                                 className=""
                                 style={{ cursor: 'pointer' }}
                                 onClick={(user_id) => submitUpdate(user.id)}
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

export default UpdateUserInfo;
