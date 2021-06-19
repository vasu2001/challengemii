import React, { useEffect, useState } from 'react';
import './coinsReq.css';
import moment from 'moment';
import firebase from '../../firebase';
import { toast } from 'react-toastify';
import CoinsReqModal from '../CoinsReqModal/CoinsReqModal';
import Loading from '../Loading/Loading';

const db = firebase.firestore();

const CoinsReq = () => {
   const [competitions, setCompetitions] = useState([]);
   const [details, setDetails] = useState(-1);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      db.collection('competitions')
         .get()
         .then(async (querySnap) => {
            const newComp = querySnap.docs
               .map((doc) => ({ id: doc.id, ...doc.data() }))
               .filter(
                  (doc) => moment().diff(moment(doc.ends)) > 0 && !doc.ended,
               );
            // console.log('newComp', newComp);

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

      setLoading(true);
      const competition = competitions[i];
      try {
         const batch = db.batch();

         batch.update(db.collection('competitions').doc(competition.id), {
            ended: true,
         });

         // const compPromise =
         //    .update();

         competition.prize.forEach((amt, pos) =>
            batch.update(
               db.collection('users').doc(competition.submissions[pos].user_id),
               {
                  coins: firebase.firestore.FieldValue.increment(amt),
               },
            ),
         );

         batch.set(db.collection('winners').doc(), {
            comp_id: competition.id,
            comp_tagline: competition.tagline,
            comp_title: competition.title,
            prize: competition.prize,
            winners: competition.submissions
               .slice(0, competition.prize.length)
               .map((sub) => ({
                  name: sub.user_name,
                  submission_id: sub.id,
                  photo: sub.photo_link,
                  user_id: sub.user_id,
               })),
            // winner_photo: competition.submissions[0]?.photo_link,
            end_date: competition.ends,
         });

         // let voters = competition.submissions[0].voters;
         // competition.prize.forEach((_, i) => {
         //    voters = voters.filter((x) =>
         //       competition.submissions[i].voters.includes(x),
         //    );
         // });

         const voters = competition.submissions
            .slice(0, competition.votes)
            .map((x) => x.voters)
            .reduce((a, b) => a.filter((x) => b.includes(x)));

         if (voters.length > 0) {
            const voterShare = Math.floor(
               parseInt(competition.voterPrize) / voters.length,
            );

            voters.forEach((voter_id) =>
               batch.update(db.collection('users').doc(voter_id), {
                  coins: firebase.firestore.FieldValue.increment(voterShare),
               }),
            );
         }

         // console.log(batch);
         await batch.commit();

         toast.success('competition ended');
         setDetails(-1);
         setCompetitions(competitions.filter((_, idx) => i !== idx));
      } catch (err) {
         console.log(err);
         toast.error('Some error occured');
      }
      setLoading(false);
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
         {loading && <Loading />}
      </div>
   );
};

export default CoinsReq;
