import React from 'react'
import { Route, Switch } from "react-router-dom";

import Card from '../../components/Competition-info/Card';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav-new/Nav'
import Submissions from '../../components/Submissions/Submissions';
import Leaderboard from '../../components/Leaderboard/Leaderboard'; 

import './competition.css';

const Competition = () => {

    const subArr = [
        'Submission-1',
        'Submission-2',
        'Submission-3',
        'Submission-4',
        'Submission-5',
        'Submission-6',
        'Submission-7',
        'Submission-8',
        'Submission-9'
    ];

    return (
        <div className='competition-pg'>
            <Nav />
            <div className='competition-content'>
                <div className='cover-img'>
                    <div className='cover-dp'></div>
                </div>
                <Card />
                <section className='section-submission'>
                    <Switch>
                        <Route path="/competition/participant" component={Leaderboard} />
                    </Switch>
                    <Leaderboard />
                    <h2 className='submission-title'>Submissions</h2>
                    <div className='submissions'>
                        {/* <Submissions />
                        <Submissions />
                        <Submissions />
                        <Submissions />
                        <Submissions />
                        <Submissions />
                        <Submissions />
                        <Submissions />
                        <Submissions /> */}
                        {
                            subArr.map((item,index) => {return <Submissions />})
                        }
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    )
}

export default Competition
