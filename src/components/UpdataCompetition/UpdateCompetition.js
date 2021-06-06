import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './updateCompetition.css';
import firebase from '../../firebase';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import VoteScreen from '../Vote-Screen/VoteScreen';

const db = firebase.firestore();

const UpdateCompetition = () => {
   const [competition, setCompetition] = useState({});
   const { id } = useParams();
   const [data, setData] = useState({
      title: '',
      tagline: '',
      starts: '',
      ends: '',
      prize: '',
      fees: '',
      desc: '',
      preregis: '',
      coverUrl: '',
      photoUrl: '',
   });
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      db.collection('competitions')
         .doc(id)
         .get()
         .then((doc) => {
            if (doc.exists) {
               setCompetition(doc.data());
            }
         });
      setData({
         title: competition.title,
         tagline: competition.tagline,
         starts: competition.starts,
         ends: competition.ends,
         prize: competition.prize,
         fees: competition.fees,
         desc: competition.desc,
         preregis: competition.preregis,
         coverUrl: competition.coverUrl,
         photoUrl: competition.photoUrl,
      });
   }, [id, competition.desc]);

   const coverBtn = () => {
      const defaultBtn = document.querySelector('#coverUrl');
      defaultBtn.click();
   };
   const photoBtn = () => {
      const defaultBtn = document.querySelector('#photoUrl');
      defaultBtn.click();
   };
   const previewImg = (e) => {
      if (e.target.files.length > 0) {
         var src = URL.createObjectURL(e.target.files[0]);
         var preview = document.getElementById('preview-img');
         preview.src = src;
      }
   };
   const previewPhoto = (e) => {
      if (e.target.files.length > 0) {
         var src = URL.createObjectURL(e.target.files[0]);
         var preview = document.getElementById('preview-photo');
         preview.src = src;
      }
   };

   const handleChange = (e) => {
      setData({
         ...data,
         [e.target.id]: e.target.value,
      });
   };

   const handleUpload = (e) => {
      setData({
         [e.target.id]: e.target.files[0],
      });
   };

   const submitUpdate = async (e) => {
      setLoading(true);
      e.preventDefault();
      try {
         const photoName = firebase
            .storage()
            .refFromURL(competition.photoUrl).name;
         const coverName = firebase
            .storage()
            .refFromURL(competition.coverUrl).name;

         const photoRef = firebase.storage().ref(`compi-covers/${photoName}`);
         const coverRef = firebase.storage().ref(`compi-covers/${coverName}`);

         await photoRef.put(data.photoUrl);
         await coverRef.put(data.coverUrl);

         const photoUrl = await photoRef.getDownloadURL();
         const coverUrl = await coverRef.getDownloadURL();

         console.log(coverUrl);

         await db.collection('competitions').doc(id).update({
            title: data.title,
            tagline: data.tagline,
            starts: data.starts,
            ends: data.ends,
            prize: data.prize,
            fees: data.fees,
            desc: data.desc,
            coverUrl,
            photoUrl,
         });
         setLoading(false);
         toast.success('Success updated.');
      } catch (err) {
         console.log(err);
         setLoading(false);
         toast.error('Error updating document.');
      }
   };
   console.log(data);
   return (
      <div className="update_competition">
         {loading ? <Loading /> : null}
         <h4>{competition.title}</h4>
         <div className="info-update-container">
            <p>Competition Title:</p>
            <input
               type="text"
               id="title"
               onChange={(e) => handleChange(e)}
               className="input-field host-field"
               placeholder="Title"
               defaultValue={competition.title}
            ></input>
            <p>Tagline:</p>
            <input
               type="text"
               id="tagline"
               onChange={(e) => handleChange(e)}
               defaultValue={competition.tagline}
               className="input-field host-field"
            ></input>
            <p>Starts at:</p>
            <input
               type="datetime-local"
               id="starts"
               onChange={(e) => handleChange(e)}
               defaultValue={competition.starts}
               className="input-field host-field"
            ></input>
            <p>End at:</p>
            <input
               type="datetime-local"
               id="ends"
               onChange={(e) => handleChange(e)}
               defaultValue={competition.ends}
               className="input-field host-field"
            ></input>
            <p>Winning prize:</p>
            <input
               type="number"
               id="prize"
               onChange={(e) => handleChange(e)}
               defaultValue={competition.prize}
               className="input-field host-field"
               placeholder=""
            ></input>
            <p>Entry fees:</p>
            <input
               type="number"
               id="fees"
               onChange={(e) => handleChange(e)}
               defaultValue={competition.fees}
               className="input-field host-field"
               placeholder=""
            ></input>
            <p>Pre registration:</p>
            <input
               type="number"
               id="preregis"
               onChange={(e) => handleChange(e)}
               defaultValue={competition.preregis}
               className="input-field host-field"
               placeholder=""
            ></input>
            <p>Description:</p>
            <textarea
               type="text"
               id="desc"
               onChange={(e) => handleChange(e)}
               defaultValue={competition.desc}
               className="input-field host-field ques-input"
               placeholder=""
            ></textarea>
            <h5 style={{ marginTop: '20px' }}>Upload competition cover</h5>
            <div className="upload-img-container">
               <img id="preview-img" src={competition.coverUrl}></img>
               <p>No file chosen, yet!</p>
            </div>
            <div className="action-container">
               <input
                  id="coverUrl"
                  onChange={(e) => {
                     previewImg(e);
                     handleUpload(e);
                  }}
                  type="file"
                  hidden
               ></input>
               <a className="btn-dp-choose" onClick={coverBtn}>
                  Choose File
               </a>
            </div>
            <h5 style={{ marginTop: '20px' }}>Upload competition photo</h5>
            <div className="upload-img-container">
               <img id="preview-photo" src={competition.photoUrl}></img>
               <p>No file chosen, yet!</p>
            </div>
            <div className="action-container">
               <input
                  id="photoUrl"
                  onChange={(e) => {
                     previewPhoto(e);
                     handleUpload(e);
                  }}
                  type="file"
                  hidden
               ></input>
               <a className="btn-dp-choose" onClick={photoBtn}>
                  Choose File
               </a>
            </div>
         </div>
         <a className="btn-update" onClick={(e) => submitUpdate(e)}>
            Update
         </a>
         <VoteScreen comp_id={id} />
      </div>
   );
};

export default UpdateCompetition;
