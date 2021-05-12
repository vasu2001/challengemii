import React from 'react'
import './cardNew.css'
import trophy from '../../assets/trophy.png';
import population from '../../assets/population.png';
import calendar from '../../assets/calendar.png';
import clock from '../../assets/clock.png';
import money from '../../assets/money.png';

const CardNew = (props) => {
    const competition = props.competition.data;
    const competition_id = props.competition.id;
    console.log(competition);
    if(competition){
        return(
            <div>
            <div className='card-new' onClick={()=>{window.location = '/competition/' + competition_id}}>
                <div className='card-photo'></div>
                <div className='card-new-container'>
                    <h3 className='card-new-title'>{competition.title}</h3>
                    <div  className='card-main-container long-time' style={{marginTop:'10px'}}>
                        <img className='prizeImg' alt="Prize" src={clock} style={{marginRight:'8px', width:'20px',height:'20px'}}/>
                        <p>{competition.starts} - {competition.ends}</p>
                    </div>
                        <p className='short-time' style={{marginTop:'10px'}}>Starts: {competition.starts}</p>
                        <p className='short-time'>Ends: {competition.ends}</p>
                    <div  className='card-main-container' style={{marginTop:'10px'}}>
                        <img className='prizeImg cd-nw-img' alt="Prize" src={money} style={{marginRight:'8px', width:'20px',height:'20px'}}/>
                        <p>Entry: {competition.fees}</p>
                    </div>
                    <div className='card-new-footer'>
                    <div className='bottom-container'>
                        <img className='prizeImg cd-nw-img' alt="Prize" src={trophy} style={{marginRight:'8px'}}/>
                        <p>: {competition.prize}</p>
                    </div>
                    <div className='bottom-container'>
                        <img className='prizeImg cd-nw-img' alt="Prize" src={population} style={{marginRight:'8px'}}/>
                        <p>: {competition.submissions} Registered</p>
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
    else{
        return(
            <center>
                <h3>Loading Competitions</h3>
            </center>
        )
    }
}

export default CardNew
