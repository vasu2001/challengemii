import React, { useEffect, useState, useContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import './competition.css';
import firebase from '../../firebase';
import { AuthContext } from '../../Auth';
import { toast } from 'react-toastify';
import Gallery from '../../components/Gallery/Gallery';
import SubmissionCard from '../../components/SubmissionCard/SubmissionCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const db = firebase.firestore();

const VOTE_LIMIT = 3;

const Competition = (props) => {
   const { currentUser } = useContext(AuthContext);
   const history = useHistory();

   const [mySubs, setMySubs] = useState(null);
   const [selectedSub, setSelectedSub] = useState([]);
   const [gallery, setGallery] = useState(-1);

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

      db.collection('submissions')
         .where('competition_id', '==', props.match.params.id)
         .get()
         .then((querySnap) => {
            setMySubs(
               querySnap.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
               })),
            );
         })
         .catch((err) => {
            toast.error('Error getting competition.');
         });

      return () => {
         window.removeEventListener('scroll', showButton);
      };
   }, []);

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

      const batch = firebase.firestore().batch();
      const dbRef = firebase.firestore().collection('submissions');

      try {
         selectedSub.forEach((i) => {
            const data = mySubs[i];
            if (data.vote === '') data.vote = '0';
            if (!data.voters) data.voters = [];

            batch.update(dbRef.doc(data.id), {
               vote: parseInt(data.vote) + 1,
               voters: [...data.voters, currentUser.uid],
            });
         });

         await batch.commit();
         setSelectedSub([]);
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

   const onReport = (i) => {};

   return (
      <div className={'competition-pg'}>
         <div className="competition-content">
            <div className="cover-img"></div>
            <Card id={props.match.params.id} />
            <div className="competition-info-container">
               <h3>Instructions</h3>
               <p style={{ marginTop: '20px' }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
               </p>
               <h3 style={{ marginTop: '40px' }}>Rules</h3>
               <p style={{ marginTop: '20px' }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
               </p>
            </div>
            <section className="section-submission">
               <Switch>
                  <Route
                     path="/competition/participant"
                     component={Leaderboard}
                  />
               </Switch>
               <Leaderboard id={props.match.params.id} />
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
                                    onReport={onReport}
                                    i={i}
                                 />
                              ))}
                           </Masonry>
                        </ResponsiveMasonry>
                     </div>
                  )}
               </div>
               <a onClick={onSubmit} className="submitButton" id="submit-vote">
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
            onReport={onReport}
         />
      </div>
   );
};

export default Competition;
