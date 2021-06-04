import React from 'react';
import './adminGeneral.css';
const AdminGeneral = () => {
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
   return (
      <div className="admin-general">
         <h5>All Competition Page Image:</h5>
         <div className="all_compi_img_container">
            <div className="upload-img-container">
               <img id="preview-img"></img>
               <p>No file chosen, yet!</p>
            </div>
            <div className="action-container">
               <input
                  id="choose-input"
                  onChange={(e) => {
                     previewImg(e);
                  }}
                  type="file"
                  hidden
               ></input>
               <a className="btn-dp-choose" onClick={defaultBtn}>
                  Choose File
               </a>
            </div>
         </div>
         <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
         >
            <a className="btn-update">Update</a>
         </div>
      </div>
   );
};

export default AdminGeneral;
