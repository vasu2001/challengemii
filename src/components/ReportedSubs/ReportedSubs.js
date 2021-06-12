import React, { useEffect, useState } from 'react';
import './reportedSubs.css';
import img from '../../assets/second.jpg';
import firebase from '../../firebase';
import moment from 'moment';
import { toast } from 'react-toastify';

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
            compId: subDoc.competition_id,
         });
      }
      setData(newData);
   };

   const sortedData = data.sort(
      (a, b) =>
         moment(b.lastReported).format('YYYYMMDD') -
         moment(a.lastReported).format('YYYYMMDD'),
   );

   const deleteSub = async (comp_id, user_id, sub_id) => {
      try {
         const storagePromise = firebase
            .storage()
            .ref(`images/${comp_id}/${user_id}`)
            .delete();

         const subPromise = firebase
            .firestore()
            .collection('submission')
            .doc(sub_id)
            .delete();

         const repPromise = firebase
            .firestore()
            .collection('reports')
            .doc(sub_id)
            .delete();

         await Promise.all([storagePromise, subPromise, repPromise]);
         toast.success('Successfully deleted');
      } catch (err) {
         console.log(err);
         toast.error('Error updating document');
      }
   };

   console.log(sortedData);

   return (
      <div className="reported_subs">
         <table>
            <thead>
               <tr>
                  <th>UserId</th>
                  <th>SubId</th>
                  <th>Image</th>
                  <th>Reports</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {sortedData.map((data) => {
                  return (
                     <tr>
                        <td data-column="UserId">{data.userId}</td>
                        <td data-column="SubId">{data.submissionId}</td>
                        <td data-column="Image">
                           <img
                              src={data.photo}
                              style={{ width: '150px' }}
                           ></img>
                        </td>
                        <td data-column="Reports">
                           <p>{data.no}</p>
                        </td>
                        <td>
                           <a
                              className=""
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                 deleteSub(
                                    data.compId,
                                    data.userId,
                                    data.submissionId,
                                 );
                              }}
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

export default ReportedSubs;
