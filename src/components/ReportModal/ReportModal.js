import React from 'react';
import './ReportModal.css';

const ReportModal = ({ onYes, onNo }) => {
   return (
      <div className="modal-backdrop">
         <div className="modal-content">
            <h5>Do you want to report this submission?</h5>
            <div>
               <a className="btn-yes" onClick={onYes}>
                  Yes
               </a>
               <a onClick={onNo}>No</a>
            </div>
         </div>
      </div>
   );
};

export default ReportModal;
