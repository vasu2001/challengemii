import React, { useEffect, useState } from 'react';
import './submissions.css';
import { AiFillLike } from 'react-icons/ai';
import { FaShareAlt } from 'react-icons/fa';
import Gallery from '../Gallery/Gallery';

const Submissions = ({ submission, onLike, selected, onClick, i }) => {
   const onShare = () => {
      navigator.share?.({
         title: 'Share your submission with your friends!',
         url: window.location.href,
      });
   };
   return (
      <div className={`submission ${'active' ? 'selected' : ''}`}>
         <div className="sub-head">
            <p>{submission.user_name}</p>
         </div>
         <div className="sub-img-container">
            <a onClick={onClick} className="img-btn">
               <img
                  alt=""
                  src={submission.photo_link}
                  className="wrapper-img"
               />
            </a>
         </div>
         <div className="vote-container">
            <a
               onClick={() => onLike(i)}
               style={{ color: selected ? 'black' : 'white' }}
               className="btn-vote"
            >
               <AiFillLike />
            </a>
            <a onClick={onShare} className="btn-vote">
               <FaShareAlt />
            </a>
         </div>
      </div>
   );
};

export default Submissions;
