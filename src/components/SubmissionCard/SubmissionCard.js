import React, { useContext } from 'react';
import './submissionCard.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { AiFillLike } from 'react-icons/ai';
import { FaShareAlt } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { AuthContext } from '../../Auth';
import { toast } from 'react-toastify';

const SubmissionCard = ({
   submission,
   onLike,
   selected,
   onClick,
   i,
   highlight,
   onReport,
   votingEnd,
}) => {
   const history = useHistory();
   const { currentUser } = useContext(AuthContext);

   const onShare = () => {
      if (!currentUser) {
         toast.error('You must be logged in.');
         return history.push('/sign-in');
      }
      navigator.share?.({
         title: 'Share your submission with your friends!',
         url: window.location.href,
      });
   };

   return (
      <Fade bottom>
         <div
            className={`sub_box ${highlight ? 'highlight' : ''}  ${
               votingEnd
                  ? i == 0
                     ? 'golden-border'
                     : i == 1
                     ? 'silver-border'
                     : i == 3
                     ? 'bronze-border'
                     : ''
                  : ''
            }`}
         >
            <img
               onClick={() => onClick(i)}
               alt=""
               key={i}
               src={submission.photo_link}
               className="sub_img"
               style={{ width: '100%', display: 'block', borderRadius: '7px' }}
            />
            <div className="label_box">
               <Link to={`/user/${submission.user_id}`}>
                  <p>{submission.user_name}</p>
               </Link>
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
                  <a onClick={() => onReport(i)}>
                     <MdReport />
                  </a>
               </div>
            </div>
         </div>
      </Fade>
   );
};

export default SubmissionCard;
