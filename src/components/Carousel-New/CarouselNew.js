import React, { useState } from 'react';
import './carouselNew.css';
import Carousel from 'react-bootstrap/Carousel';
import firebase from '../../firebase';
const CarouselNew = () => {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
   };

   const customStyles = {
      position: 'absolute',
      top: '60%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
   };

   return (
      <div className="carousel-new">
         <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item interval={3000}>
               <div className="slide-1"></div>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
               <div className="slide-2"></div>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
               <div className="slide-3"></div>
            </Carousel.Item>
         </Carousel>
      </div>
   );
};

export default CarouselNew;
