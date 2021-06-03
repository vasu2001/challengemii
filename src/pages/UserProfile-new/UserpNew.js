import React, { useContext, useEffect, useState } from 'react';
import './userpNew.css';
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
import firebase from '../../firebase';
import { AuthContext } from '../../Auth';
import { Link } from 'react-router-dom';
import SubmissionCard from '../../components/SubmissionCard/SubmissionCard';
import DpChangeModal from '../../components/DpChangeModal/DpChangeModal';

const db = firebase.firestore();

const UserpNew = () => {
   const { currentUser, userData } = useContext(AuthContext);
   const userId = currentUser.uid;
   const [submissions, setSubmissions] = useState([]);
   const [display, setDisplay] = useState(false);
   useEffect(() => {
      if (currentUser) {
         db.collection('submissions')
            .where('user_id', '==', currentUser.uid)
            .get()
            .then((querySnap) => {
               setSubmissions(querySnap.docs.map((doc) => doc.data()));
            });
      }
   }, [currentUser]);

   console.log(submissions);

   if (!currentUser || !userData) {
      return (
         <center>
            <h3>Loading...</h3>
         </center>
      );
   }
   return (
      <div>
         {display ? <DpChangeModal /> : null}
         <div className="user-profile-new">
            <div
               className="profile-dp-new"
               style={{ backgroundImage: `url(${userData.photoURL})` }}
            >
               <div className="edit-photo">
                  <AiFillEdit />
               </div>
            </div>
            <div className="social-container-new">
               <div className="social-link-new">
                  <a href={userData.instagram} target="_blank" rel="noreferrer">
                     <AiOutlineInstagram style={{ transform: 'scale(1.5)' }} />
                  </a>
               </div>
               <div className="social-link-new">
                  <AiFillFacebook style={{ transform: 'scale(1.8)' }} />
               </div>
               <div className="social-link-new">
                  <FaTwitter style={{ transform: 'scale(1.5)' }} />
               </div>
               <div className="social-link-new">
                  <AiFillLinkedin style={{ transform: 'scale(1.5)' }} />
               </div>
            </div>
            <div className="profile-content-new">
               <div className="user-actions">
                  {currentUser.uid === userId ? (
                     <Link
                        to="/profile/edit-profile"
                        className="btn-edit-profile"
                     >
                        Edit profile
                     </Link>
                  ) : null}
                  <GoSignOut
                     className="btn-sign-out"
                     onClick={() => {
                        window.location.href = '/';
                        firebase.auth().signOut();
                     }}
                  />
               </div>
               {currentUser.uid === userId ? (
                  <Link
                     to="/profile/edit-profile"
                     className="btn-edit-profile-mob"
                  >
                     <AiFillEdit />
                  </Link>
               ) : null}
               <div className="content-top">
                  <h3>{userData.name}</h3>
                  <div className="about-para-new">
                     <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to
                        use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing hidden in the middle of
                        text. All the Lorem Ipsum generators on the Internet
                        tend to repeat predefined chunks as necessary, making
                        this the first true generator on the Internet. It uses a
                        dictionary of over 200 Latin words, combined with a
                        handful of model sentence structures, to generate Lorem
                        Ipsum which looks reasonable. The generated Lorem Ipsum
                        is therefore always free from repetition, injected
                        humour, or non-characteristic words etc.
                     </p>
                  </div>
               </div>
               <div className="content-submissions">
                  <h3>Submissions</h3>
                  <div className="submission-holder">
                     {submissions &&
                        submissions.map((submission) => {
                           return (
                              <SubmissionCard
                                 submission={submission}
                                 key={submission.id}
                              />
                           );
                        })}
                  </div>
               </div>
            </div>
         </div>
         {/* <Footer /> */}
      </div>
   );
};

export default UserpNew;
