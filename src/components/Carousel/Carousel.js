import React, {useState} from 'react'
import './carousel.css';
import {BsChevronCompactLeft} from 'react-icons/bs';
import {BsChevronCompactRight} from 'react-icons/bs';

const Carousel = () => {

    let sliderArr = [
      <div className="img1"></div>,
      <div className="img2"></div>,
      <div className="img3"></div>,
    ];

    const [x,setX] = useState(0);
    const goLeft = () =>{
      x===0? setX(-100 * (sliderArr.length - 1)):setX(x+100);
    }
    const goRight = () =>{
      (x=== -100*(sliderArr.length-1))?setX(0):setX(x-100);
    }


    return (
        <div className="slider">
          {
            sliderArr.map((item,index)=>{
              return(
                <div key={index} className="slide" style={{transform: `translate3d(${x}%,0,0)`}}>
                  {item}
                </div>
              )
            })
          }
          <button id="left" className="navigation" onClick={goLeft}><BsChevronCompactLeft style={{transform:"scale(2)"}} /></button>
          <button id="right" className="navigation" onClick={goRight}><BsChevronCompactRight style={{transform:"scale(2)"}} /></button>
        </div>
    )
}

export default Carousel
