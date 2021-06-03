import React from 'react';
import './submissionCard.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { AiFillLike } from 'react-icons/ai';
import { FaShareAlt } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';

const SubmissionCard = ({ submission }) => {
   const images = [];
   submission.map((subs) => {
      return images.push(subs.photo_link);
   });
   console.log(images);
   return (
      <div className="submission_card">
         <ResponsiveMasonry columnsCountBreakPoints={{ 600: 2, 900: 3 }}>
            <Masonry gutter="10px">
               {images.map((image, i) => (
                  <div className="sub_box">
                     <img
                        alt=""
                        key={i}
                        src={image}
                        className="sub_img"
                        style={{ width: '100%', display: 'block' }}
                     />
                     <div className="label_box">
                        <p>user_name</p>
                     </div>
                     <div className="sub_action">
                        <div className="btn_holder">
                           <AiFillLike />
                        </div>
                        <div className="btn_holder">
                           <FaShareAlt />
                        </div>
                        <div className="btn_holder">
                           <MdReport />
                        </div>
                     </div>
                  </div>
               ))}
            </Masonry>
         </ResponsiveMasonry>
      </div>
   );
};

export default SubmissionCard;
