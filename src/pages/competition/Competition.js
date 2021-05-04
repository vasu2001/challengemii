import React from 'react'
import { Route, Switch } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import Card from '../../components/Competition-info/Card';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav-new/Nav'
import Submissions from '../../components/Submissions/Submissions';
import Leaderboard from '../../components/Leaderboard/Leaderboard'; 
import './competition.css';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Competition = (props) => {
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
                <Card id={props.match.params.id} />
                <section className='section-submission'>
                    <Switch>
                        <Route path="/competition/participant" component={Leaderboard} />
                    </Switch>
                    <Leaderboard />
                    <h2 className='submission-title'>Submissions</h2>
                    <SRLWrapper options={options}>
                        <div className='submissions'>
                            {
                                props.submissions && props.submissions.map(submission => {
                                    return(
                                        <Submissions submission={submission} key={submission.id} />
                                    )
                                })
                            }
                        </div>
                    </SRLWrapper>
                </section>
                <Footer />
            </div>
        </div>
    )
}

const mapStateToProps = (state,ownProps) => {
    // const compi_id = ownProps.match.params.id;
    // console.log('compi_id', compi_id);
    // const submissions_db = state.firestore.data.submissions;
    // console.log('submissions_db',submissions_db); 
    // const submissions = submissions_db ? submissions_db[compi_id] : null
    // console.log(submissions); 
    return{
        submissions: state.firestore.ordered.submissions
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'submissions'}
    ])
)(Competition)
