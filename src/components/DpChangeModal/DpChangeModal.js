import React, { useState, useContext } from 'react';
import './dpChangeModal.css';
import firebase from '../../firebase';
import { AuthContext } from '../../Auth';
import { toast } from 'react-toastify';

const db = firebase.firestore();

const DpChangeModal = ({ close }) => {
   const [photoUrl, setPhotoUrl] = useState('');
   const { currentUser, setUserData, userData } = useContext(AuthContext);

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
         const storageRef = firebase.storage().ref(`dp/${currentUser.uid}`);
         await storageRef.put(photoUrl);
         const downloadUrl = await storageRef.getDownloadURL();
         await db.collection('users').doc(currentUser.uid).update({
            photoURL: downloadUrl,
         });

         toast.success('Profile photo updated.');
         setUserData({ ...userData, photoURL: downloadUrl });
         close();
      } catch (err) {
         console.log(err);
         toast.error(
            'Sorry! We encountered some error while procession your request.',
         );
      }
   };

   return (
      <div className="dp_change_modal">
         <div className="dp_change_container">
            <h3>Change Profile Photo</h3>
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
               <a className="btn-dp-choose" onClick={defaultBtn}>
                  Choose File
               </a>
               <br />
               <a
                  className="btn-choose"
                  onClick={(e) => {
                     if (photoUrl !== '') {
                        handleSubmit(e);
                     } else {
                        toast.error('Choose a file to upload.');
                     }
                  }}
               >
                  Submit
               </a>
            </div>
         </div>
      </div>
   );
};

export default DpChangeModal;
