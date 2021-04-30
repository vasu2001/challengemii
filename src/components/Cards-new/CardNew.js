import React from 'react'
import './cardNew.css'
import trophy from '../../assets/trophy.png';
import population from '../../assets/population.png';
import calendar from '../../assets/calendar.png';
import clock from '../../assets/clock.png';
import money from '../../assets/money.png';

const CardNew = ({competition}) => {
    return (
        <div>
            <div className='card-new' onClick={()=>{window.location = '/competition'}}>
                <div className='card-photo'></div>
                <div className='card-new-container'>
                    <h3 className='card-new-title'>{competition.title}</h3>
                    <div  className='card-main-container long-time' style={{marginTop:'10px'}}>
                        <img className='prizeImg' alt="Prize" src={clock} style={{marginRight:'8px', width:'20px',height:'20px'}}/>
                        <p>16 Apr, 2021 12:00 AM IST - 26 Apr,2021 06:00 AM IST</p>
                    </div>
                        <p className='short-time' style={{marginTop:'10px'}}>Starts: 16 Apr, 2021</p>
                        <p className='short-time'>Ends:16 Apr, 2021</p>
                    <div  className='card-main-container' style={{marginTop:'10px'}}>
                        <img className='prizeImg cd-nw-img' alt="Prize" src={money} style={{marginRight:'8px', width:'20px',height:'20px'}}/>
                        <p>Entry: {competition.entry}</p>
                    </div>
                    <div className='card-new-footer'>
                    <div className='bottom-container'>
                        <img className='prizeImg cd-nw-img' alt="Prize" src={trophy} style={{marginRight:'8px'}}/>
                        <p>: 2000</p>
                    </div>
                    <div className='bottom-container'>
                        <img className='prizeImg cd-nw-img' alt="Prize" src={population} style={{marginRight:'8px'}}/>
                        <p>: 48 Registered</p>
                    </div>
                    <div className='bottom-container'>
                        <img className='prizeImg cd-nw-img' alt="Prize" src={calendar} style={{marginRight:'8px'}}/>
                        <p>: 4 days left</p>
                    </div>
                    </div>
                </div>
                <a className={`btn-live ${competition.active?"live-style":""}`} href='34'>{competition.status}</a>
            </div>
        </div>
    )
}

export default CardNew
