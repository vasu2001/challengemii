import React, {useState,useEffect} from 'react'
import './card.css'
import skills from '../../assets/skills.png';
import trophy from '../../assets/trophy.png';
import ticketImg from '../../assets/ticket.png';
import population from '../../assets/population.png';
import calendar from '../../assets/calendar.png';
import firebase from '../../firebase';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';

const db = firebase.firestore();

const Card = (props) => {
    
    const [competition, setCompetitions] = useState({});

    useEffect(() => {
        db.collection('competitions')
            .doc(props.id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                setCompetitions(doc.data());
                }
            });
    }, [props.id]);
    
    if(competition){
    return (
        <div className='cards'>
            <div className='card_side_1'>
                <h3>{competition.title}</h3>
                <h6 id='tagline'>{competition.tagline}</h6>
                <p id='date-info'>{moment(competition.starts).format('Do MMM, YYYY h:mm a')} - {moment(competition.ends).format('Do MMM, YYYY h:mm a')}</p>
                <div className='extra-info'>
                    <p><img className='img-extrainfo' src={trophy} alt=''></img><span>Prize: {competition.prize} coins</span></p>
                    <p><img className='img-extrainfo' src={skills} alt=''></img><span>Eligible: All</span></p>
                    <p><img className='img-extrainfo' src={ticketImg} alt=''></img><span>Entry: {competition.fees} tickets</span></p>
                </div>
            </div>
            <div className='card_side_2'>
                <div className='side2-actions'>
                    <Link to={'/participation/' + props.id} id='btn-participate'>
                        Participate
                    </Link>
                    <a id='btn-refer'>Refer</a>
                </div>
                <div className='side2-info'>
                    <p><img src={population} alt='' className='img-side2'></img>{competition.submissions} Registered</p>
                    <p><img src={calendar} alt='' className='img-side2'></img>{moment(competition.starts).fromNow()}</p>
                </div>
            </div>
        </div>
    )
    }
    else{
        return(
            <center>
            <div style={{ marginTop: '100px' }}>
               <h3>Loading competition...</h3>
            </div>
         </center>
        )
    }
}

export default Card
