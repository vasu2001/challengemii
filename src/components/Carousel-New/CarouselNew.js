import React from 'react'
import './carouselNew.css'
import Carousel from 'react-bootstrap/Carousel'

const CarouselNew = () => {
    
    const customStyles = {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }
    
    return (
        <div className='carousel-new'>
            <Carousel pause={false}>
  <Carousel.Item interval={3000}>
    <div className='slide-1'>
    </div>
    <Carousel.Caption style={customStyles}>
      {/* <h3>Participate in exciting competitions and win prizes</h3> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={3000}>
  <div className='slide-2'>
    </div>
    <Carousel.Caption>
      {/* <h3>Predict the winner and win money</h3> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={3000}>
  <div className='slide-3'>
    </div>
    <Carousel.Caption>
      {/* <h3>Refer and earn money</h3> */}
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>
    )
}

export default CarouselNew
