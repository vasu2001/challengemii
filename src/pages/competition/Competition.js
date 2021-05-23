import React, { useEffect, useState, useContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
// import Card from '../../components/Competition-info/Card';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Submissions from '../../components/Submissions/Submissions';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import './competition.css';
import firebase from '../../firebase';
import { AuthContext } from '../../Auth';
import { toast } from 'react-toastify';
import Gallery from '../../components/Gallery/Gallery';

const db = firebase.firestore();

const VOTE_LIMIT = 3;

const Competition = (props) => {
   const options = {
      buttons: {
         showAutoplayButton: false,
         showDownloadButton: false,
      },
   };

   const { currentUser } = useContext(AuthContext);
   // console.log({currentUser})
   const history = useHistory();

   const [mySubs, setMySubs] = useState([]);
   const [selectedSub, setSelectedSub] = useState([]);
   const [gallery, setGallery] = useState(-1);

   useEffect(() => {
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

   const showButton = () => {
      const element = document.getElementById('submit-vote');
      if (window.scrollY >= 1000) {
         element.style.right = '0';
      }
      if (window.scrollY < 300) {
         element.style.right = '-200px';
      }
   };

   const onLike = (i) => {
      if (selectedSub.includes(i))
         setSelectedSub([...selectedSub.filter((x) => x !== i)]);
      else setSelectedSub([...selectedSub, i]);
   };

   return (
      <div className={'competition-pg'}>
         <div className="competition-content">
            <div className="cover-img"></div>
            <Card id={props.match.params.id} />
            <section className="section-submission">
               <Switch>
                  <Route
                     path="/competition/participant"
                     component={Leaderboard}
                  />
               </Switch>
               <Leaderboard id={props.match.params.id} />
               <h2 className="submission-title">Submissions</h2>
               {/* <SRLWrapper options={options}> */}
               <div className="submissions">
                  {mySubs.length == 0 ? (
                     <center>
                        <p>There is no submission yet.</p>
                     </center>
                  ) : null}
                  {mySubs &&
                     mySubs.map((submission, i) => {
                        return (
                           <Submissions
                              submission={submission}
                              key={submission.id}
                              selected={selectedSub.includes(i)}
                              onClick={() => setGallery(i)}
                              onLike={onLike}
                              i={i}
                           />
                        );
                     })}
               </div>
               {/* </SRLWrapper> */}
               <a onClick={onSubmit} className="submitButton" id="submit-vote">
                  Submit ({selectedSub.length}/{VOTE_LIMIT})
               </a>
            </section>
         </div>
         <Gallery
            display={gallery}
            setDisplay={setGallery}
            data={mySubs}
            onLike={onLike}
            selected={selectedSub}
         />
      </div>
   );
};

export default Competition;
