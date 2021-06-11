import React, { useContext, useEffect, useState } from 'react';
import './participation.css';
import firebase from '../../firebase';
import image1 from '../../assets/banner.jpg';
import { AuthContext } from '../../Auth';
import Loading from '../../components/Loading/Loading';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useHistory, useLocation, useParams } from 'react-router';

const db = firebase.firestore();

const Participation = () => {
   const { currentUser, setCurrentUser } = useContext(AuthContext);
   const [photoUrl, setPhotoUrl] = useState('');
   const [loading, setLoading] = useState(false);
   const [exists, setExists] = useState(false);

   const competition_id = useParams().id;
   const user_id = currentUser?.uid;
   const user_name = currentUser?.displayName;

   const history = useHistory();

   let { referBy, compFees } = useLocation().state;
   if (referBy === user_id) referBy = undefined;

   useEffect(() => {
      if (currentUser) {
         db.collection('submissions')
            .where('user_id', '==', currentUser.uid)
            .where('competition_id', '==', competition_id)
            .get()
            .then((querySnap) => {
               querySnap.forEach((doc) => {
                  if (doc.exists) {
                     setExists(true);
                  }
               });
            });
      }
   }, [currentUser, competition_id]);

   const defaultBtn = () => {
      const defaultBtn = document.querySelector('#choose-input');
      defaultBtn.click();
   };

   const previewImg = (e) => {
      if (e.target.files.length > 0) {
         var src = URL.createObjectURL(e.target.files[0]);
         var preview = document.getElementById('preview-img');
         preview.src = src;
      }
   };

   const handleUpload = (e) => {
      if (e.target.files[0]) {
         setPhotoUrl(e.target.files[0]);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const storageRef = firebase
            .storage()
            .ref(`images/${competition_id}/${user_id}`);

         await storageRef.put(photoUrl);
         const downloadUrl = await storageRef.getDownloadURL();

         await db.collection('submissions').add({
            competition_id,
            photo_link: downloadUrl,
            user_id,
            user_name,
            vote: 0,
            voters: [],
            referBy: referBy ?? null,
         });

         await db
            .collection('competitions')
            .doc(competition_id)
            .update({
               submissions: firebase.firestore.FieldValue.increment(1),
            });

         setCurrentUser({
            ...currentUser,
            tickets: currentUser.tickets - compFees,
         });
         setLoading(false);
         toast.success(
            'Congrats! Your submission has been successfully uploaded.',
         );
         history.goBack();
      } catch (error) {
         toast.error(
            'Sorry! We encountered some error uploading your submission.',
         );
      }
   };
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1 }}
      >
         <div className="participation-pg">
            {loading ? <Loading /> : null}
            <div className="participation-card">
               {exists ? (
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                     }}
                  >
                     <h4>Your response has already been submitted.</h4>
                  </div>
               ) : (
                  <div>
                     <h3 className="card-title">Upload your submission</h3>
                     <div className="upload-img-container">
                        <img id="preview-img"></img>
                        <p>No file chosen, yet!</p>
                     </div>
                     <div className="action-container">
                        <input
                           id="choose-input"
                           onChange={(e) => {
                              handleUpload(e);
                              previewImg(e);
                           }}
                           type="file"
                           hidden
                        ></input>
                        <a className="btn-choose" onClick={defaultBtn}>
                           Choose File
                        </a>
                        {/* <div style={{ marginTop: '30px' }}>
                           <p
                              className={`yt-link ${hidden ? '' : 'hide'}`}
                              onClick={() => setHidden(!hidden)}
                           >
                              Add link to your youtube video
                           </p>
                           <input
                              className={hidden ? 'hide' : ''}
                              type="text"
                              onChange={handleInput}
                              placeholder="Youtube-link"
                           ></input>
                        </div> */}
                     </div>
                     <a
                        className="btn-submit"
                        onClick={(e) => {
                           if (photoUrl !== '') {
                              setLoading(true);
                              handleSubmit(e);
                           } else {
                              toast.error('Choose a file to upload!');
                           }
                        }}
                     >
                        Submit
                     </a>
                  </div>
               )}
            </div>
         </div>
      </motion.div>
   );
};

export default Participation;
