import React, { useState } from 'react';
import './addPrize.css';
import { toast } from 'react-toastify';
import { v4 as uuid4 } from 'uuid';
import firebase from '../../firebase';
import Loading from '../Loading/Loading';

const initDetails = {
   name: '',
   coins: '',
   image: '',
   ques: '',
   description: '',
   tags: '',
};

const AddPrize = () => {
   const [details, setDetails] = useState(initDetails);
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      setDetails({
         ...details,
         [e.target.id]: e.target.value,
      });
   };

   const handleUpload = (e) => {
      setDetails({
         ...details,
         image: e.target.files[0],
      });
   };

   const onSubmit = async (e) => {
      if (
         details.name === '' ||
         details.coins === '' ||
         details.image === '' ||
         details.description === ''
      ) {
         toast.error('Fill out all the fields');
         return;
      }

      setLoading(true);
      e.preventDefault();
      const uid = uuid4();

      try {
         const storageRef = firebase.storage().ref(`prize-covers/${uid}`);
         await storageRef.put(details.image);
         const imageURL = await storageRef.getDownloadURL();

         await firebase
            .firestore()
            .collection('prizes')
            .doc(uid)
            .set({
               name: details.name,
               coins: details.coins,
               image: imageURL,
               description: details.description,
               ques: details.ques
                  .split('\n')
                  .map((s) => s.trim())
                  .filter((s) => s.length > 0),
               tags: details.tags.split(',').map((x) => x.trim().toLowerCase()),
            });
         setLoading(false);
         toast.success('Prize Uploaded Successfully!');

         setDetails({ ...initDetails });
         document.querySelectorAll('.prize-input').forEach((x) => {
            x.value = '';
         });
      } catch (err) {
         console.log(err);
         toast.error('Error');
         setLoading(false);
      }
   };

   return (
      <div className="add-prize">
         {loading ? <Loading /> : null}
         <p>Prize Title:</p>
         <input
            type="text"
            id="name"
            onChange={handleChange}
            className="input-field prize-input"
            placeholder="Name"
         ></input>
         <p>Prize Coin:</p>
         <input
            type="number"
            id="coins"
            onChange={handleChange}
            className="input-field prize-input"
            placeholder="Coins"
         ></input>
         <p>Prize Questions (Enter seperated) :</p>
         <textarea
            type="text"
            id="ques"
            onChange={handleChange}
            className="input-field prize-input ques-input"
            placeholder="Questions"
         ></textarea>
         <p>Prize Description:</p>
         <textarea
            type="text"
            id="description"
            onChange={handleChange}
            className="input-field prize-input ques-input"
            placeholder="Description"
         ></textarea>{' '}
         <p>Prize Tags (Comma seperated) :</p>
         <textarea
            type="text"
            id="tags"
            onChange={handleChange}
            className="input-field prize-input ques-input"
            placeholder="Tags"
         ></textarea>
         <p>Add Product Image:</p>
         <input
            id="choose-input"
            type="file"
            className="prize-input"
            onChange={handleUpload}
         ></input>
         <br />
         <a className="btn-add-product" onClick={onSubmit}>
            Add Product
         </a>
      </div>
   );
};

export default AddPrize;
