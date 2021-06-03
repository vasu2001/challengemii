import React, { useEffect, useState } from 'react';
import './gallery.css';
import image1 from '../../assets/third.jpg';
import image2 from '../../assets/girl.jpg';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';

const Gallery = ({ display, setDisplay, data, onLike, selected, onReport }) => {
   const [i, setI] = useState(0);
   const n = data.length;
   const voted = selected.includes(i);

   useEffect(() => {
      setI(display);
   }, [display]);

   const onNext = () => {
      setI((i) => i + 1);
   };
   const onPrev = () => {
      setI((i) => i - 1);
   };

   const onShare = () => {
      navigator.share?.({
         title: 'Share your submission with your friends!',
         url: window.location.href,
      });
   };

   return (
      <div className={`gallery ${display === -1 ? 'close' : null}`}>
         <a className="close-btn" onClick={() => setDisplay(-1)}>
            <CgClose color="white" />
         </a>
         <img src={data[i]?.photo_link} className="gallery-img-box"></img>
         <div className="gallery-action-box">
            <a className="btn-gallery-vote" onClick={() => onLike(i)}>
               {voted ? 'Un-vote' : 'Vote'}
            </a>
            <a className="btn-gallery-share" onClick={onShare}>
               Share
            </a>
            <a className="btn-gallery-vote" onClick={() => onReport(i)}>
               Report
            </a>
         </div>
         <div className="gallery-action-box box-2">
            <a className="btn-gallery-share">Visit Profile</a>
         </div>
         <a className={`btn-left ${i === 0 ? 'close' : null}`} onClick={onPrev}>
            <BsChevronLeft />
         </a>
         <a
            className={`btn-right ${i === n - 1 ? 'close' : null}`}
            onClick={onNext}
         >
            <BsChevronRight />
         </a>
      </div>
   );
};

export default Gallery;
