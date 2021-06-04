import React from 'react';
import './updateCompetition.css';
const UpdateCompetition = () => {
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
      <div className="update_competition">
         <h4>Competition Name</h4>
         <div className="info-update-container">
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
            <p>Competition Title:</p>
            <input
               type="text"
               id="title"
               className="input-field host-field"
               placeholder="Title"
            ></input>
            <p>Starts at:</p>
            <input
               type="datetime-local"
               id="starts"
               className="input-field host-field"
            ></input>
            <p>End at:</p>
            <input
               type="datetime-local"
               id="ends"
               className="input-field host-field"
            ></input>
            <p>Winning prize:</p>
            <input
               type="number"
               id="prize"
               className="input-field host-field"
               placeholder=""
            ></input>
            <p>Entry fees:</p>
            <input
               type="number"
               id="fees"
               className="input-field host-field"
               placeholder=""
            ></input>
            <p>Instructions:</p>
            <textarea
               type="text"
               id="instructions"
               className="input-field host-field ques-input"
               placeholder=""
            ></textarea>
            <p>Rules:</p>
            <textarea
               type="text"
               id="rules"
               className="input-field host-field ques-input"
               placeholder=""
            ></textarea>
         </div>
         <a className="btn-update">Update</a>
      </div>
   );
};

export default UpdateCompetition;
