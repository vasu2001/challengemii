import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Leaderboard from '../../components/Leaderboard-new/Leaderboard';
import './competition.css';
import firebase from '../../firebase';
import { AuthContext } from '../../Auth';
import { toast } from 'react-toastify';
import Gallery from '../../components/Gallery/Gallery';
import SubmissionCard from '../../components/SubmissionCard/SubmissionCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion } from 'framer-motion';
import ReportModal from '../../components/ReportModal/ReportModal';
import Loading from '../../components/Loading/Loading';
import moment from 'moment';

const queryString = require('query-string');

const db = firebase.firestore();

const Competition = () => {
   const { currentUser } = useContext(AuthContext);
   const history = useHistory();
   const { state: locationState, search } = useLocation();
   const { id } = useParams();
   const { referBy } = queryString.parse(search);

   const [competition, setCompetitions] = useState({});
   const [mySubs, setMySubs] = useState(null);
   const [selectedSub, setSelectedSub] = useState([]);
   const [gallery, setGallery] = useState(-1);
   const [reportModal, setReportModal] = useState(-1);
   const [loading, setLoading] = useState(false);

   const VOTE_LIMIT = competition?.votes ?? 3;

   const fetchSubs = () =>
      db
         .collection('submissions')
         .where('competition_id', '==', id)
         .orderBy('vote', 'desc')
         .get()
         .then((querySnap) => {
            const submissions = querySnap.docs.map((doc) => ({
               ...doc.data(),
               id: doc.id,
            }));
            setMySubs(submissions);
         })
         .catch((err) => {
            console.log(err);
            toast.error('Error getting competition.');
         });

   const fetchComp = () => {
      if (locationState) {
         setCompetitions(locationState);
         document.title = 'ChallengeMii - ' + locationState.title;
      } else
         db.collection('competitions')
            .doc(id)
            .get()
            .then((doc) => {
               if (doc.exists) {
                  setCompetitions(doc.data());
                  document.title = 'ChallengeMii - ' + doc.data().title;
               } else {
                  history.push('/error');
               }
            })
            .catch((err) => {
               console.log(err);
               toast.error('Error getting competition.');
            });
   };

   useEffect(() => {
      const showButton = () => {
         const element = document.getElementById('submit-vote');
         if (window.scrollY >= 1000) {
            element.style.right = '0';
         }
         if (window.scrollY < 300) {
            element.style.right = '-200px';
         }
      };
      window.addEventListener('scroll', showButton);

      fetchSubs();
      fetchComp();

      return () => {
         window.removeEventListener('scroll', showButton);
      };
   }, [currentUser, id]);

   const onSubmit = async () => {
      if (!currentUser) {
         toast.error('You must be logged in');
         history.push('/sign-in');
         return;
      }

      if (selectedSub.length !== VOTE_LIMIT) {
         toast.error('You must vote ' + VOTE_LIMIT + ' participants to submit');
         return;
      }

      if (mySubs.map(({ user_id }) => user_id).includes(currentUser.uid)) {
         toast.error('Participants cannot vote');
         return;
      }

      if (
         mySubs
            ?.map((sub) => sub.voters?.includes(currentUser.uid))
            .reduce((a, b) => a || b)
      ) {
         toast.error('Can only vote once');
         return;
      }

      const batch = firebase.firestore().batch();
      const dbRef = firebase.firestore().collection('submissions');

      try {
         setLoading(true);
         selectedSub.forEach((i) => {
            const data = mySubs[i];
            if (data.vote === '') data.vote = 0;
            if (!data.voters) data.voters = [];

            batch.update(dbRef.doc(data.id), {
               vote: parseInt(data.vote) + 1,
               voters: [...data.voters, currentUser.uid],
            });
         });

         await batch.commit();
         setSelectedSub([]);
         setLoading(false);
         await fetchSubs();
         toast.success('Votes successfully submitted.');
      } catch (err) {
         console.log(err);
         toast.error('Some error occured');
      }
   };

   const onLike = (i) => {
      if (selectedSub.includes(i))
         setSelectedSub([...selectedSub.filter((x) => x !== i)]);
      else setSelectedSub([...selectedSub, i]);
   };

   const onReport = async () => {
      try {
         const id = mySubs[reportModal].id;
         const dbRef = db.collection('reports').doc(id);
         const userId = currentUser.uid;

         const doc = await dbRef.get();
         if (doc.exists) {
            const data = doc.data();

            if (data.reportedBy.includes(userId)) {
               toast.error('You can only report once');
               setReportModal(-1);
               return;
            }

            data.reportedBy.push(userId);
            data.lastReported = moment().toString();
            await dbRef.set(data);
         } else {
            await dbRef.set({
               reportedBy: [userId],
               lastReported: moment().toString(),
            });
         }

         toast.success('Submission reported');
      } catch (err) {
         console.log(err);
         toast.error('Something went wrong');
      }
      setReportModal(-1);
   };
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1 }}
      >
         <div className={'competition-pg'}>
            {loading ? <Loading /> : null}
            <div className="competition-content">
               <img className="cover-img" src={competition.coverUrl}></img>
               <Card competition={competition} id={id} referBy={referBy} />
               <div className="competition-info-container">
                  <div className="competition-info-text">
                     <p>{competition.desc}</p>
                  </div>
               </div>
               <section className="section-submission">
                  {moment().diff(competition.ends) > 0 ? (
                     <Leaderboard data={mySubs} />
                  ) : (
                     <div className="nd-ld-container">
                        <h4>
                           Leaderboard will be revealed after competition ends.
                        </h4>
                     </div>
                  )}
                  <h2 className="submission-title">Submissions</h2>
                  <div className="submissions">
                     {!mySubs ? (
                        <center>
                           <p>Loading</p>
                        </center>
                     ) : mySubs.length === 0 ? (
                        <center>
                           <p>There is no submission yet.</p>
                        </center>
                     ) : (
                        <div className="submission_card">
                           <ResponsiveMasonry
                              columnsCountBreakPoints={{ 600: 2, 900: 3 }}
                           >
                              <Masonry gutter="10px">
                                 {mySubs.map((submission, i) => (
                                    <SubmissionCard
                                       submission={submission}
                                       key={submission.id}
                                       selected={selectedSub.includes(i)}
                                       onClick={setGallery}
                                       onLike={onLike}
                                       onReport={setReportModal}
                                       i={i}
                                       highlight={
                                          submission.user_id ===
                                          currentUser?.uid
                                       }
                                    />
                                 ))}
                              </Masonry>
                           </ResponsiveMasonry>
                        </div>
                     )}
                  </div>
                  <a
                     onClick={onSubmit}
                     className="submitButton"
                     id="submit-vote"
                  >
                     Submit ({selectedSub.length}/{VOTE_LIMIT})
                  </a>
               </section>
            </div>
            <Gallery
               display={gallery}
               setDisplay={setGallery}
               data={mySubs ?? []}
               onLike={onLike}
               selected={selectedSub}
               onReport={setReportModal}
            />
         </div>

         {reportModal > -1 && (
            <ReportModal onYes={onReport} onNo={() => setReportModal(-1)} />
         )}
      </motion.div>
   );
};

export default Competition;
