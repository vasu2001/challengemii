import React, { useContext, useEffect, useState } from 'react';
import './basic.css';
import firebase from '../../firebase';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../Auth';

const Basic = () => {
   const { userData: user, currentUser, setUserData } = useContext(AuthContext);

   const [userDetails, setUserDetails] = useState(user);
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      setUserDetails({
         ...userDetails,
         [e.target.id]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      setLoading(true);
      e.preventDefault();
      firebase
         .firestore()
         .collection('users')
         .doc(currentUser.uid)
         .update(userDetails)
         .then(() => {
            setLoading(false);
            toast.success('Profile updated successfully !');
            setUserData({ ...userDetails });
         })
         .catch((err) => {
            setLoading(false);
            toast.error('Error updating profile !');
         });
   };

   console.log(userDetails);

   if (user) {
      return (
         <div>
            {loading ? <Loading /> : null}
            <div className="main-container">
               <div className="basic-info">
                  <p>Basics:</p>
                  <input
                     type="text"
                     className="input-field"
                     id="name"
                     onChange={handleChange}
                     placeholder="Full Name"
                     defaultValue={user.name}
                  ></input>
                  <textarea
                     className="input-description"
                     id="desc"
                     onChange={handleChange}
                     rows="15"
                     defaultValue={user.desc}
                     placeholder="Tell something about yourself"
                  ></textarea>
               </div>
               <hr style={{ marginBottom: '50px' }} />
               <div className="social-info">
                  <p>Social Links:</p>
                  <div className="social-box">
                     <div className="social-title">
                        <p className="social-link-head">https:twitter.com/</p>
                     </div>
                     <input
                        type="text"
                        name="twitter-link"
                        className="input-field social"
                        id="twitter"
                        onChange={handleChange}
                        placeholder="Twitter Profile"
                        defaultValue={user.twitter}
                     ></input>
                  </div>
                  <label for="twitter-link" className="input-label">
                     Add your twitter username (e.g. tomcruise11)
                  </label>
                  <div className="social-box">
                     <div className="social-title">
                        <p className="social-link-head">https:instagram.com/</p>
                     </div>
                     <input
                        type="text"
                        name="insta-link"
                        className="input-field social"
                        id="instagram"
                        onChange={handleChange}
                        placeholder="Instagram Profile"
                        defaultValue={user.instagram}
                     ></input>
                  </div>
                  <label for="insta-link" className="input-label">
                     Add your instagram username (e.g. tomcruise11)
                  </label>
                  <div className="social-box">
                     <div className="social-title">
                        <p className="social-link-head">
                           https:www.facebook.com/
                        </p>
                     </div>
                     <input
                        type="text"
                        name="fb-link"
                        className="input-field social"
                        id="facebook"
                        onChange={handleChange}
                        placeholder="Facebook Profile"
                        defaultValue={user.facebook}
                     ></input>
                  </div>
                  <label for="fb-link" className="input-label">
                     Add your facebook username (e.g. tomcruise11)
                  </label>
                  <div className="social-box">
                     <div className="social-title">
                        <p className="social-link-head">https:linkedin.com/</p>
                     </div>
                     <input
                        type="text"
                        name="linkedin-link"
                        className="input-field social"
                        id="linkedin"
                        onChange={handleChange}
                        placeholder="LinkedIn Profile"
                        defaultValue={user.linkedin}
                     ></input>
                  </div>
                  <label for="linkedin-link" className="input-label">
                     Add your linkedin username (e.g. tomcruise11)
                  </label>
               </div>
               <div className="save">
                  <a
                     href={() => false}
                     className="btn-save"
                     onClick={(e) => handleSubmit(e)}
                  >
                     Save
                  </a>
               </div>
            </div>
         </div>
      );
   } else {
      return (
         <center>
            <h3>Loading...</h3>
         </center>
      );
   }
};

export default Basic;
