import React, { useState } from 'react'
import './gallery.css'
import image1 from '../../assets/third.jpg'
import image2 from '../../assets/girl.jpg'
import {BsChevronRight} from 'react-icons/bs'
import {BsChevronLeft} from 'react-icons/bs'
import {GrClose} from 'react-icons/gr'
const Gallery = (props) => {

    const [display,setDisplay] = useState(true);

    return (
        <div className={`gallery ${!display?'close':null}`}>   
            <a className='close-btn' onClick={() => setDisplay(false)}><GrClose /></a>
            <img src={image2} className='gallery-img-box'></img>
            <div className='gallery-action-box'>
                <a className='btn-gallery-vote'>Vote</a>
                <a className='btn-gallery-share'>Share</a>
            </div>
            <a className='btn-left'><BsChevronLeft /></a>
            <a className='btn-right'><BsChevronRight /></a>
        </div>
    )
}

export default Gallery
