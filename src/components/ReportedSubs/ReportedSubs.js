import React, { useEffect, useState } from 'react';
import './reportedSubs.css';
import img from '../../assets/second.jpg';
import firebase from '../../firebase';

const ReportedSubs = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const newData = [];

      const querySnap = await firebase.firestore().collection('reports').get();

      for (const doc of querySnap.docs) {
         const report = doc.data();
         const submissionId = doc.id;

         const subDoc = (
            await firebase
               .firestore()
               .collection('submissions')
               .doc(submissionId)
               .get()
         ).data();

         newData.push({
            submissionId,
            lastReported: report.lastReported,
            no: report.reportedBy.length,
            photo: subDoc.photo_link,
            userId: subDoc.user_id,
         });
      }
      setData(newData);
   };

   return (
      <div className="reported_subs">
         <table>
            <thead>
               <tr>
                  <th>UserId</th>
                  <th>Image</th>
                  <th>Reports</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td data-column="UserId">123KDFKJEI3421</td>
                  <td data-column="Image">
                     <img src={img} style={{ width: '150px' }}></img>
                  </td>
                  <td data-column="Reports">
                     <p>2</p>
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
