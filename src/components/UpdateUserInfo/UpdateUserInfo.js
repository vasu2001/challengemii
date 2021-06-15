import React, { useContext, useEffect, useState } from 'react';
import './updateUserInfo.css';
import firebase from '../../firebase';
import { toast } from 'react-toastify';

const UpdateUserInfo = () => {
   const [users, setUsers] = useState([]);
   const [search, setSearch] = useState('');

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

   const handleChange = (e, userId) => {
      const newUsers = [...users];
      const i = newUsers.findIndex((x) => x.id == userId);
      newUsers[i] = {
         ...users[i],
         data: {
            ...users[i].data,
            [e.target.id]: parseInt(e.target.value),
         },
      };
      setUsers(newUsers);
   };

   const submitUpdate = async (user) => {
      const { coins, tickets } = user.data;
      if (coins !== '' && tickets !== '') {
         try {
            await firebase.firestore().collection('users').doc(user.id).update({
               coins,
               tickets,
            });
            toast.success('Updated successfully.');
         } catch (err) {
            console.log(err);
            toast.error('Error updating document.');
         }
      } else {
         toast.error('Fill up fields to update.');
      }
   };

   const filterUsers = users.filter((user) => {
      return (
         user.id === search ||
         user.data.name?.toLowerCase().includes(search.toLowerCase()) ||
         user.data.email?.toLowerCase().includes(search.toLowerCase())
      );
   });
   // console.log(users);
   // console.log(users.map((user) => user.data.email));
   return (
      <div className="update-user-info">
         <input
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
         />
         <p style={{ marginTop: '10px' }}>
            No. of users :- <span>{users.length}</span>
         </p>
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
               {filterUsers.map((user, i) => {
                  return (
                     <tr key={i}>
                        <td data-column="Name">{user.data.name}</td>
                        <td data-column="UserId">{user.id}</td>
                        <td data-column="Email">{user.data.email}</td>
                        <td data-column="Coins">
                           <input
                              id="coins"
                              defaultValue={user.data.coins}
                              onChange={(e) => handleChange(e, user.id)}
                              className="vote-update-input"
                           ></input>
                        </td>
                        <td data-column="Tickets">
                           <input
                              id="tickets"
                              onChange={(e) => handleChange(e, user.id)}
                              defaultValue={user.data.tickets}
                              className="vote-update-input"
                           ></input>
                        </td>
                        <td data-column="Votes">
                           <a
                              className=""
                              style={{ cursor: 'pointer' }}
                              onClick={() => submitUpdate(user)}
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
