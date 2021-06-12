import React, { useEffect, useState } from 'react';
import './coinsReq.css';
import moment from 'moment';
import firebase from '../../firebase';
import { toast } from 'react-toastify';
import CoinsReqModal from '../CoinsReqModal/CoinsReqModal';

const db = firebase.firestore();

const CoinsReq = () => {
   const [competitions, setCompetitions] = useState([]);
   const [details, setDetails] = useState(-1);

   useEffect(() => {
      db.collection('competitions')
         .get()
         .then(async (querySnap) => {
            const newComp = querySnap.docs
               .map((doc) => ({ id: doc.id, ...doc.data() }))
               .filter(
                  (doc) => moment().diff(moment(doc.ends)) > 0 && !doc.ended,
               );
            console.log('newComp', newComp);

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
               subData.sort((a, b) => b.vote - a.vote);
               newComp[i].submissions = subData;
            }
            setCompetitions(newComp);
         });
   }, []);

   const onPay = async (e, i) => {
      e.preventDefault();
      if (i < 0) return;

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

         let voters = competition.submissions[0].voters;
         competition.prize.forEach((_, i) => {
            voters = voters.filter((x) =>
               competition.submissions[i].voters.includes(x),
            );
         });

         let voterPromise = [];
         if (voters.length > 0) {
            const voterShare = parseInt(competition.voterPrize) / voters.length;

            voterPromise = voters.map((voter_id) =>
               db
                  .collection('users')
                  .doc(voter_id)
                  .update({
                     coins: firebase.firestore.FieldValue.increment(voterShare),
                  }),
            );
         }
         await Promise.all([
            compPromise,
            winnerPromise,
            ...prizePromise,
            ...voterPromise,
         ]);

         toast.success('competition ended');
         setDetails(-1);
         setCompetitions(competitions.filter((_, idx) => i !== idx));
      } catch (err) {
         console.log(err);
         toast.error('Some error occured');
      }
   };

   // console.log(details);

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
               {competitions?.map((competition, i) => {
                  const comp = competition;
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
                           {comp.submissions.length}
                        </td>
                        <td data-column="Prize">
                           {comp.prize?.reduce((a, b) => a + b)}
                        </td>
                        <td>
                           <a
                              className=""
                              style={{ cursor: 'pointer' }}
                              onClick={() => setDetails(i)}
                           >
                              Details
                           </a>
                        </td>
                     </tr>
                  );
               })}
               {details > -1 ? (
                  <CoinsReqModal
                     data={competitions[details]}
                     close={() => setDetails(-1)}
                     onPay={(e) => onPay(e, details)}
                  />
               ) : null}
            </tbody>
         </table>
      </div>
   );
};

export default CoinsReq;
