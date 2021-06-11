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
import { Link, useHistory, useParams } from 'react-router-dom';
import DpChangeModal from '../../components/DpChangeModal/DpChangeModal';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import userImg from '../../assets/user.png';
import { motion } from 'framer-motion';
import Fade from 'react-reveal/Fade';

const db = firebase.firestore();

const UserpNew = () => {
   const { id } = useParams();
   let userId = id;

   const { currentUser, userData: myData } = useContext(AuthContext);
   if (id === 'me' && currentUser) {
      userId = currentUser.uid;
   }

   const [submissions, setSubmissions] = useState(null);
   const [userData, setUserData] = useState(null);
   const [display, setDisplay] = useState(false);

   const history = useHistory();

   useEffect(() => {
      if (id === 'me') setUserData(myData);
   }, [myData]);

   useEffect(() => {
      if (id !== 'me') {
         db.collection('users')
            .doc(userId)
            .get()
            .then((querySnap) => {
               setUserData(querySnap.data());
            });
      }

      if (userId !== 'me') {
         db.collection('submissions')
            .where('user_id', '==', userId)
            .get()
            .then((querySnap) => {
               setSubmissions(
                  querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
               );
            });
      }
   }, [userId]);

   console.log({ submissions, userData });

   if (userId === 'me' || !userData) {
      return (
         <center>
            <h3>Loading...</h3>
         </center>
      );
   }
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1 }}
      >
         <div>
            {display ? <DpChangeModal close={() => setDisplay(false)} /> : null}
            <div className="user-profile-new">
               <div
                  className="profile-dp-new"
                  // style={{ backgroundImage: `url(${userData.photoURL})` }}
                  style={{
                     backgroundImage: `url(${
                        userData.photoURL !== '' ? userData.photoURL : userImg
                     })`,
                  }}
               >
                  {id === 'me' ? (
                     <a onClick={() => setDisplay(true)}>
                        <div className="edit-photo">
                           <AiFillEdit />
                        </div>
                     </a>
                  ) : null}
               </div>
               <div className="social-container-new">
                  <a
                     href={'https://instagram.com/' + userData.instagram}
                     target="_blank"
                  >
                     <div className="social-link-new">
                        <AiOutlineInstagram
                           style={{ transform: 'scale(1.5)' }}
                        />
                     </div>
                  </a>
                  <a
                     href={'https://facebook.com/' + userData.facebook}
                     target="_blank"
                  >
                     <div className="social-link-new">
                        <AiFillFacebook style={{ transform: 'scale(1.8)' }} />
                     </div>
                  </a>
                  <a
                     href={'https://twitter.com/' + userData.twitter}
                     target="_blank"
                  >
                     <div className="social-link-new">
                        <FaTwitter style={{ transform: 'scale(1.5)' }} />
                     </div>
                  </a>
                  <a
                     href={'https://linkedin.com/' + userData.linkedin}
                     target="_blank"
                  >
                     <div className="social-link-new">
                        <AiFillLinkedin style={{ transform: 'scale(1.5)' }} />
                     </div>
                  </a>
               </div>
               <div className="profile-content-new">
                  <div className="user-actions">
                     {id === 'me' ? (
                        <Link
                           to="/profile/edit-profile"
                           className="btn-edit-profile"
                        >
                           Edit profile
                        </Link>
                     ) : null}
                     {id == 'me' ? (
                        <GoSignOut
                           className="btn-sign-out"
                           onClick={() => {
                              window.location.href = '/';
                              firebase.auth().signOut();
                           }}
                        />
                     ) : null}
                  </div>
                  {id === 'me' ? (
                     <Link
                        to="/profile/edit-profile"
                        className="btn-edit-profile-mob"
                     >
                        <AiFillEdit />
                     </Link>
                  ) : null}
                  <Fade bottom>
                     <div className="content-top">
                        <h3>{userData.name}</h3>
                        <div className="about-para-new">
                           <p>{userData.desc}</p>
                        </div>
                     </div>
                  </Fade>
                  <div className="content-submissions">
                     <h3>Submissions</h3>
                     <div className="submission-holder">
                        <ResponsiveMasonry
                           columnsCountBreakPoints={{ 600: 2, 900: 3 }}
                        >
                           <Masonry gutter="10px">
                              {submissions?.map((submission, i) => (
                                 <Fade bottom>
                                    <div
                                       className="sub_box"
                                       key={submission.id}
                                    >
                                       <img
                                          alt=""
                                          src={submission.photo_link}
                                          className="sub_img"
                                          style={{
                                             width: '100%',
                                             display: 'block',
                                          }}
                                          onClick={() =>
                                             history.push(
                                                `/competition/${submission.competition_id}`,
                                             )
                                          }
                                       />
                                    </div>
                                 </Fade>
                              ))}
                           </Masonry>
                        </ResponsiveMasonry>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default UserpNew;
