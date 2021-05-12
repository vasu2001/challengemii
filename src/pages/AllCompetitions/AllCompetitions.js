import React, { Component, useEffect } from 'react'
import Nav from '../../components/Nav-new/Nav'
import './allCompetitions.css';
import Footer from '../../components/Footer/Footer';
import CarouselNew from '../../components/Carousel-New/CarouselNew';
import CardNew from '../../components/Cards-new/CardNew';
import firebase from '../../firebase';
import ongoing from '../../assets/gift-box.png'
import upcoming from '../../assets/check-in.png'
import { useState } from 'react';

const db = firebase.firestore();

const AllCompetitions = () => {

    const [competitions,setCompetitions] = useState([])

    useEffect(() => {
        db.collection('competitions').get().then(querySnap => {
            querySnap.forEach(doc => {
                setCompetitions(prevState => [...prevState, {id:doc.id, data:doc.data()}]);
            })
        })
    },[])
    console.log(competitions);
    return(
    <div className='all-competitions'>
            <CarouselNew />
            <div className='all-competitions-content'>
                <div className='left-pane'>
                    <ul className='left-items'>
                        <li><img alt='' src={ongoing} style={{width:'30px', transform: 'translateY(-5px)', marginRight:'5px'}}/>Ongoing</li>
                        <li><img alt='' src={upcoming} style={{width:'30px', transform: 'translateY(-5px)', marginRight:'5px'}}/>Upcoming</li>
                    </ul>
                </div>
                <div className = 'right-pane'>
                    <div className = 'right-header'>
                        <h2>Competitions</h2>
                        <div className='status'>
                            <div className='ongoing'>Ongoing</div>
                            <div className='upcoming'>Upcoming</div>
                        </div>
                    </div>
                    {competitions && competitions.map(competition => {
                        return(
                            <CardNew competition={competition} key={competition.id} />
                        )
                    })}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default AllCompetitions