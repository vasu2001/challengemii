import React, { useEffect, useState } from 'react';
import './coinsReq.css';
import moment from 'moment';
import firebase from '../../firebase';
import { toast } from 'react-toastify';

const db = firebase.firestore();

const CoinsReq = () => {
   const [competitions, setCompetitions] = useState([]);

   useEffect(() => {
      db.collection('competitions')
         .get()
         .then(async (querySnap) => {
            const newComp = querySnap.docs
               .filter(
                  (doc) =>
                     moment().diff(moment(doc.data().ends)) > 0 &&
                     !doc.data().ended,
               )
               .map((doc) => {
                  return { id: doc.id, data: doc.data() };
               });

            for (const i in newComp) {
               const doc = newComp[i];

               const subSnap = await db
                  .collection('submissions')
                  .where('competition_id', '==', doc.id)
                  .get();
               const subData = subSnap.docs.map((x) => ({
                  id: x.id,
                  ...x.data(),
               }));
               subData.sort((a, b) => a.vote - b.vote);
               newComp[i].submissions = subData;
            }

            setCompetitions(newComp);
         });
   }, []);

   const onPay = async (e, i) => {
      e.preventDefault();
      const competition = competitions[i];

      try {
         const compPromise = db
            .collection('competitions')
            .doc(competition.id)
            .update({
               ended: true,
            });

         const prizePromise = competition.prize.map((amt, pos) =>
            db
               .collection('users')
               .doc(competition.submissions[pos].user_id)
               .update({
                  coins: firebase.firestore.FieldValue.increment(amt),
               }),
         );

         const winnerPromise = db.collection('winners').add({
            comp_id: competition.id,
            comp_tagline: competition.tagline,
            comp_title: competition.title,
            prize: competition.prize,
            winners: competition.submissions
               .slice(0, competition.prize.length)
               .map((sub) => ({ name: sub.user_name, submission_id: sub.id })),
            winner_photo: competition.submissions[0]?.photo_link,
            end_date: competition.ends,
         });

         await Promise.all([compPromise, winnerPromise, ...prizePromise]);
         toast.success('competition ended');
      } catch (err) {
         console.log(err);
         toast.error('Some error occured');
      }
   };

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
                           <td data-column="Prize">
                              {comp.prize?.reduce((a, b) => a + b)}
                           </td>
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
