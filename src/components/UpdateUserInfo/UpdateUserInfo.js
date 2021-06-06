import React, { useEffect, useState } from 'react';
import './updateUserInfo.css';
import firebase from '../../firebase';

const UpdateUserInfo = () => {
   const [users, setUsers] = useState([]);
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
                                 defaultValue={user.data.coins}
                                 className="vote-update-input"
                              ></input>
                           </td>
                           <td data-column="Tickets">
                              <input
                                 defaultValue={user.data.tickets}
                                 className="vote-update-input"
                              ></input>
                           </td>
                           <td data-column="Votes">
                              <a className="" style={{ cursor: 'pointer' }}>
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
