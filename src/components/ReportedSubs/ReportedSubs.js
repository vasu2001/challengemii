import React, { useEffect, useState } from 'react';
import './reportedSubs.css';
import img from '../../assets/second.jpg';
import firebase from '../../firebase';

const ReportedSubs = () => {
   const [reports, setReports] = useState([]);
   const [subs, setSubs] = useState([]);

   useEffect(() => {
      firebase
         .firestore()
         .collection('reports')
         .get()
         .then((querySnap) => {
            setReports(
               querySnap.docs.map((doc) => ({ data: doc.data(), id: doc.id })),
            );
            firebase
               .firestore()
               .collection('submissions')
               .where(
                  'uid',
                  '==',
                  reports.map((report) => report.id),
               )
               .get()
               .then((querySnap) => {
                  querySnap.docs.map((doc) => {
                     console.log(doc.data());
                  });
               });
         });
   }, []);
   console.log(reports.map((report) => report.id));
   return (
      <div className="reported_subs">
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>UserId</th>
                  <th>Email</th>
                  <th>Image</th>
                  <th>Reports</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td data-column="Name">Krishna</td>
                  <td data-column="UserId">123KDFKJEI3421</td>
                  <td data-column="Email">krishnasaxena@gmail.com</td>
                  <td data-column="Image">
                     <img src={img} style={{ width: '150px' }}></img>
                  </td>
                  <td data-column="Reports">
                     <input
                        defaultValue="2"
                        className="vote-update-input"
                     ></input>
                  </td>
                  <td>
                     <a className="" style={{ cursor: 'pointer' }}>
                        Delete
                     </a>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default ReportedSubs;
