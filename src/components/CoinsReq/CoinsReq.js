import React, { useEffect, useState } from 'react';
import './coinsReq.css';
import moment from 'moment';
import firebase from '../../firebase';

const CoinsReq = () => {
   const [competitions, setCompetitions] = useState([]);

   useEffect(() => {
      firebase
         .firestore()
         .collection('competitions')
         .get()
         .then((querySnap) => {
            querySnap.docs.map((doc) => {
               if (moment().diff(doc.data().ends) > 0) {
                  setCompetitions((prevState) => [
                     ...prevState,
                     { id: doc.id, data: doc.data() },
                  ]);
               }
            });
         });
   }, []);

   console.log(competitions);

   return (
      <div className="coins-req">
         <table>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Starts</th>
                  <th>Ends</th>
                  <th>Participants</th>
                  <th>Prize</th>
                  <th>Details</th>
               </tr>
            </thead>
            <tbody>
               {competitions &&
                  competitions.map((competition, i) => {
                     const comp = competition.data;
                     return (
                        <tr key={i}>
                           <td data-column="Title">{comp.title}</td>
                           <td data-column="Starts">
                              {' '}
                              {moment(comp.starts).format('DD/MM/YYYY')}
                           </td>
                           <td data-column="Ends">
                              {moment(comp.ends).format('DD/MM/YYYY')}
                           </td>
                           <td data-column="Participants">
                              {comp.submissions}
                           </td>
                           <td data-column="Prize">{comp.prize}</td>
                           <td>
                              <a className="" style={{ cursor: 'pointer' }}>
                                 Details
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

export default CoinsReq;
