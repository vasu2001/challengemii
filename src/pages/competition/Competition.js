import React, { useEffect, useState } from 'react'
import { Route, Switch } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import Card from '../../components/Competition-info/Card';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav-new/Nav'
import Submissions from '../../components/Submissions/Submissions';
import Leaderboard from '../../components/Leaderboard/Leaderboard'; 
import './competition.css';
import firebase from '../../firebase'

const db = firebase.firestore();

const Competition = (props) => {
    const options = {
        buttons: {
            showAutoplayButton: false,
            showDownloadButton: false
        }
    };

    const [mySubs, setMySubs] = useState([])
    const [passSubs, setPassSubs] = useState([])

    useEffect(() => {
        db.collection('submissions').where('competition_id', '==', props.match.params.id).get()
        .then((querySnap) => {
            querySnap.forEach((doc) => {
                setMySubs(prevState => [...prevState, doc.data()]);
            })
        })
        .catch((err) => {
            console.log('Error: ', err);
        })
    },[])
    console.log('mysubs: ', mySubs);
    return (
        <div className='competition-pg'>
            {/* <Nav /> */}
            <div className='competition-content'>
                <div className='cover-img'>
                    <div className='cover-dp'></div>
                </div>
                <Card id={props.match.params.id} />
                <section className='section-submission'>
                    <Switch>
                        <Route path="/competition/participant" component={Leaderboard} />
                    </Switch>
                    <Leaderboard id={props.match.params.id} />
                    <h2 className='submission-title'>Submissions</h2>
                    <SRLWrapper options={options}>
                        <div className='submissions'>
                            {
                                mySubs && mySubs.map(submission => {
                                    return(
                                        <Submissions submission={submission} key={submission.id} />
                                    )
                                })
                            }
                        </div>
                    </SRLWrapper>
                </section>
                {/* <Footer /> */}
            </div>
        </div>
    )
}


export default Competition
