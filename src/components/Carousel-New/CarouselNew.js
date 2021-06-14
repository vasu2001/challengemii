import React, { useEffect, useState } from 'react';
import './carouselNew.css';
import Carousel from 'react-bootstrap/Carousel';
import firebase from '../../firebase';

const CarouselNew = () => {
   const [index, setIndex] = useState(0);
   const [img, setImg] = useState([]);

   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
   };

   useEffect(() => {
      const photoPromise = Array.from({ length: 5 }).map((_, i) =>
         firebase
            .storage()
            .ref(`all-competitions/img${i + 1}`)
            .getDownloadURL(),
      );

      Promise.all(photoPromise).then((res) => setImg(res));
   }, []);

   const customStyles = {
      position: 'absolute',
      top: '60%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
   };

   return (
      <div className="carousel-new">
         <Carousel activeIndex={index} onSelect={handleSelect}>
            {img.map((url, i) => (
               <Carousel.Item interval={3000} key={i}>
                  <img className="slide" src={url}></img>
               </Carousel.Item>
            ))}
         </Carousel>
      </div>
   );
};

export default CarouselNew;
