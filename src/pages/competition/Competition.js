import React from 'react'
import { Route, Switch } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";

import Card from '../../components/Competition-info/Card';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav-new/Nav'
import Submissions from '../../components/Submissions/Submissions';
import Leaderboard from '../../components/Leaderboard/Leaderboard'; 

import './competition.css';

const Competition = () => {

    const subArr = [
        'https://source.unsplash.com/random/krishan',
        'https://source.unsplash.com/random/krish',
        'https://source.unsplash.com/random/kris',
        'https://source.unsplash.com/random/krhan',
        'https://source.unsplash.com/random/kishan',
        'https://source.unsplash.com/random/shan',
        'https://source.unsplash.com/random/kan',
        'https://source.unsplash.com/random/kshan'
    ];
    const options = {
        buttons: {
            showAutoplayButton: false,
            showDownloadButton: false
        }
    };

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
                    <SRLWrapper options={options}>
                        <div className='submissions'>
                                <Submissions imgSrc='https://source.unsplash.com/random/krishan'/>
                                <Submissions imgSrc='https://source.unsplash.com/random/none'/>
                                <Submissions imgSrc='https://source.unsplash.com/random/nne'/>
                                <Submissions imgSrc='https://source.unsplash.com/random/nne'/>
                                    {
                                        subArr.map((item,index) => {return <Submissions imgSrc={item} />})
                                    }
                        </div>
                    </SRLWrapper>
                </section>
                <Footer />
            </div>
        </div>
    )
}

export default Competition
