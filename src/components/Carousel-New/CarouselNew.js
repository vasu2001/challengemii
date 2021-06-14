import React, { useEffect, useState } from 'react';
import './carouselNew.css';
import Carousel from 'react-bootstrap/Carousel';
import firebase from '../../firebase';
const CarouselNew = () => {
   const [index, setIndex] = useState(0);
   const [img, setImg] = useState({
      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '',
   });

   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
   };

   // const fetchImg = async () => {
   //    for(var i=1;i<6;i++){
   //       const url = await firebase.storage().ref(`all-competitions/img${i}`).getDownloadURL();
   //       setImg({
   //          [`img${i}`]: url
   //       })
   //    }
   // }

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
               <img className="slide"></img>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
               <img className="slide"></img>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
               <img className="slide"></img>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
               <img className="slide"></img>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
               <img className="slide"></img>
            </Carousel.Item>
         </Carousel>
      </div>
   );
};

export default CarouselNew;
