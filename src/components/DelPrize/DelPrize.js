import React, { useEffect, useState } from 'react';
import './delPrize.css';
import firebase from '../../firebase';
import { toast } from 'react-toastify';

const db = firebase.firestore();

const DelPrize = () => {
   const [prizes, setPrizes] = useState([]);

   useEffect(() => {
      db.collection('prizes')
         .get()
         .then((querySnap) => {
            setPrizes(
               querySnap.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
               })),
            );
         });
   }, []);

   console.log(prizes);
   const deleteComp = async (prize_id) => {
      try {
         const storageRef = firebase
            .storage()
            .ref()
            .child('prize-covers')
            .child(prize_id);
         await db.collection('prizes').doc(prize_id).delete();

         await storageRef.delete();

         toast.success('Competition successfully deleted.');
      } catch (err) {
         console.log(err);
         toast.error('Error deleting competition');
      }
   };

   return (
      <div className="del-prize">
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Coins</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {prizes &&
                  prizes.map((prize, i) => {
                     return (
                        <tr key={i}>
                           <td data-column="">{i + 1}</td>
                           <td data-column="Title">{prize.data.name}</td>
                           <td data-column="Coins">{prize.data.coins}</td>
                           <td>
                              <a
                                 className=""
                                 style={{ cursor: 'pointer' }}
                                 onClick={() => deleteComp(prize.id)}
                              >
                                 Delete
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

export default DelPrize;
