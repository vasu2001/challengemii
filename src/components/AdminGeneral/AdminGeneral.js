import React, { useState } from 'react';
import './adminGeneral.css';
import placeholder from '../../assets/placeholder-2.png';
import firebase from '../../firebase';
import { toast } from 'react-toastify';

const AdminGeneral = () => {
   const [holder, setHolder] = useState('');

   const defaultBtn = (str) => {
      const defaultBtn = document.getElementById(str);
      defaultBtn.click();
   };
   const previewImg = (e, str) => {
      console.log(e.target.files);
      if (e.target.files.length > 0) {
         var src = URL.createObjectURL(e.target.files[0]);
         var preview = document.getElementById(str);
         preview.src = src;
      }
   };

   const handleUpload = (e) => {
      setHolder(e.target.files[0]);
   };

   const uploadImage = async (i) => {
      try {
         const imgRef = firebase.storage().ref(`all-competitions/img${i}`);
         await imgRef.put(holder);
         const imgUrl = await imgRef.getDownloadURL();
         console.log(imgUrl);
         await firebase
            .firestore()
            .collection('all-competitions')
            .doc('carousel')
            .set({
               img1: imgUrl,
            });
         toast.success('Succefully uploaded !');
      } catch (err) {
         toast.error('Error uploading document');
      }
   };

   console.log(holder);
   return (
      <div className="admin-general">
         <h5>All Competition Page Image:</h5>
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Preview</th>
                  <th>Upload</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>1</td>
                  <td>
                     <input
                        id="img1"
                        onChange={(e) => {
                           previewImg(e, 'img1-prev');
                           handleUpload(e);
                        }}
                        type="file"
                        hidden
                     ></input>
                     <a className="" onClick={() => defaultBtn('img1')}>
                        Choose
                     </a>
                  </td>
                  <td>
                     <img
                        id="img1-prev"
                        src={placeholder}
                        style={{ width: '150px' }}
                     ></img>
                  </td>
                  <td>
                     <a
                        className=""
                        onClick={() => {
                           uploadImage(0);
                        }}
                     >
                        Update
                     </a>
                  </td>
               </tr>
               <tr>
                  <td>2</td>
                  <td>
                     <input
                        id="img2"
                        onChange={(e) => {
                           previewImg(e, 'img2-prev');
                           handleUpload(e);
                        }}
                        type="file"
                        hidden
                     ></input>
                     <a className="" onClick={() => defaultBtn('img2')}>
                        Choose
                     </a>
                  </td>
                  <td>
                     <img
                        id="img2-prev"
                        src={placeholder}
                        style={{ width: '150px' }}
                     ></img>
                  </td>
                  <td>
                     <a className="">Update</a>
                  </td>
               </tr>
               <tr>
                  <td>3</td>
                  <td>
                     <input
                        id="img3"
                        onChange={(e) => {
                           previewImg(e, 'img3-prev');
                           handleUpload(e);
                        }}
                        type="file"
                        hidden
                     ></input>
                     <a className="" onClick={() => defaultBtn('img3')}>
                        Choose
                     </a>
                  </td>
                  <td>
                     <img
                        id="img3-prev"
                        src={placeholder}
                        style={{ width: '150px' }}
                     ></img>
                  </td>
                  <td>
                     <a className="">Update</a>
                  </td>
               </tr>
               <tr>
                  <td>4</td>
                  <td>
                     <input
                        id="img4"
                        onChange={(e) => {
                           previewImg(e, 'img4-prev');
                           handleUpload(e);
                        }}
                        type="file"
                        hidden
                     ></input>
                     <a className="" onClick={() => defaultBtn('img4')}>
                        Choose
                     </a>
                  </td>
                  <td>
                     <img
                        id="img4-prev"
                        src={placeholder}
                        style={{ width: '150px' }}
                     ></img>
                  </td>
                  <td>
                     <a className="">Update</a>
                  </td>
               </tr>
               <tr>
                  <td>5</td>
                  <td>
                     <input
                        id="img5"
                        onChange={(e) => {
                           previewImg(e, 'img5-prev');
                           handleUpload(e);
                        }}
                        type="file"
                        hidden
                     ></input>
                     <a className="" onClick={() => defaultBtn('img5')}>
                        Choose
                     </a>
                  </td>
                  <td>
                     <img
                        id="img5-prev"
                        src={placeholder}
                        style={{ width: '150px' }}
                     ></img>
                  </td>
                  <td>
                     <a className="">Update</a>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default AdminGeneral;
