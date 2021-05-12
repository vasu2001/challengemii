import React, { useEffect, useState } from 'react'
import './submissions.css'
import { AiFillLike } from 'react-icons/ai';
import { FaShareAlt } from 'react-icons/fa';


const Submissions = (props) => {
    
    return (
        <div className={`submission ${"active"?"selected":""}`} >
            <div className='sub-head'>
                <p>{props.submission.user_name}</p>
            </div>
            <div className='sub-img-container'>
             <img alt='' src={props.submission.photo_link} className='wrapper-img' />
            </div>
            <div className='vote-container'>
                <a href={()=>false} className='btn-vote'><AiFillLike /></a>
                <a href={()=>false} className='btn-vote'><FaShareAlt /></a>
            </div>
        </div>
    )
}

export default Submissions