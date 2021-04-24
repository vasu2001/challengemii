import React from 'react'
import './card.css';

import money from '../../assets/money.png';
import skills from '../../assets/skills.png';
import trophy from '../../assets/trophy.png';
import population from '../../assets/population.png';
import calendar from '../../assets/calendar.png';

const Card = () => {
    return (
        <div className='info-container'>
            <div className='side-1'>
                <div className='upper'>
                    <p style={{fontSize:"28px", marginBottom:"5px"}}>Hack the space</p>
                    <p style={{marginLeft:"3px"}}>lorem ipsum dolor sit amet.</p>
                </div>
                <div className='time-stamp-container'>
                <p className='time-stamp'>16 Apr, 2021 12:00 AM IST - 26 Apr,2021 06:00 AM IST</p>
                </div>
                <div className='date-time'>
                    <p style={{fontSize:'16px', marginLeft:'20px'}}>Start:<span style={{fontSize:'14px', marginLeft:'10px', color:'#454545'}}>16 Apr, 2021 12:00 AM IST</span></p>
                    <p style={{fontSize:'16px', marginLeft:'20px', marginBottom:'15px'}}>End:<span style={{fontSize:'14px', marginLeft:'10px', color:'#454545'}}>26 Apr, 2021 6:00 AM IST</span></p>
                </div>
                <div className='lower'>
                <div className='lower-item'>
                    <img className='prizeImg' alt="Prize" src={trophy}/>
                    <p style={{marginTop:'3px', marginLeft:"10px"}}>Prize: <span>Rs.2000</span></p>
                </div>
                <div className='lower-item'>
                    <img className='prizeImg' alt="Prize" src={skills}/>
                    <p style={{marginTop:'3px', marginLeft:"10px"}}>Eligible: <span>All</span></p>
                </div>
                <div className='lower-item'>
                    <img className='prizeImg' alt="Prize" src={money}/>
                    <p style={{marginTop:'3px', marginLeft:"10px"}}>Entry: <span>Rs. 500</span></p>
                </div>
                </div>
            </div>
            <div></div>
            <div className='side-2'>
                <a className="btn btn-slide">Participate</a>
                <div className="slide2-content">
                    <div className="slide2-item">
                        <img className='slideImg' alt="Prize" src={population}/>
                        <p className='registered'>48</p>
                        <p style={{color:'#484848'}} className='registered-text'>Registered</p>
                    </div>
                    <div className="slide2-item">
                        <img className='slideImg' alt="Prize" src={calendar}/>
                        <p className='registered'>4</p>
                        <p style={{color:'#484848'}} className='registered-text'>Days Left</p>
                    </div>
                    <div className="entry">
                        Rs. 500
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
