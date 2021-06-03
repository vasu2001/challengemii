import React from 'react';
import './submissionCard.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { AiFillLike } from 'react-icons/ai';
import { FaShareAlt } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';

const SubmissionCard = ({ submission, onLike, selected, onClick, i }) => {
   const onShare = () => {
      navigator.share?.({
         title: 'Share your submission with your friends!',
         url: window.location.href,
      });
   };

   return (
      <div className="sub_box">
         <img
            onClick={() => onClick(i)}
            alt=""
            key={i}
            src={submission.photo_link}
            className="sub_img"
            style={{ width: '100%', display: 'block' }}
         />
         <div className="label_box">
            <a>
               <p>{submission.user_name}</p>
            </a>
         </div>
         <div className="sub_action">
            <div className={`btn_holder ${selected ? 'btn_selected' : ''}`}>
               <a onClick={() => onLike(i)}>
                  <AiFillLike />
               </a>
            </div>

            <div className="btn_holder">
               <a onClick={onShare}>
                  <FaShareAlt />
               </a>
            </div>

            <div className="btn_holder">
               <a>
                  <MdReport />
               </a>
            </div>
         </div>
      </div>
   );
};

export default SubmissionCard;
