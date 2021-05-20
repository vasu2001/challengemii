import React, { useEffect, useState,useContext } from 'react'
import { Route, Switch } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import Card from '../../components/Competition-info/Card';
import Footer from '../../components/Footer/Footer';
import Submissions from '../../components/Submissions/Submissions';
import Leaderboard from '../../components/Leaderboard/Leaderboard'; 
import './competition.css';
import firebase from '../../firebase'
import { AuthContext } from '../../Auth';
import {toast } from 'react-toastify';
import Gallery from '../../components/Gallery/Gallery';

const db = firebase.firestore();

const VOTE_LIMIT=3

const Competition = (props) => {
    const options = {
        buttons: {
            showAutoplayButton: false,
            showDownloadButton: false
        }
    };

    const {currentUser} = useContext(AuthContext);
    console.log({currentUser})

    const [mySubs, setMySubs] = useState([])
    const [selectedSub, setSelectedSub] = useState([]);
    // const [showButton,setShowButton] = useState(false);

    useEffect(() => {
        db.collection('submissions').where('competition_id', '==', props.match.params.id).get()
        .then((querySnap) => {
            setMySubs(querySnap.docs.map(doc=>
                ({
                    ...doc.data(),
                    id:doc.id
                })
            ));
        })
        .catch((err) => {
            toast.error('Error getting competition.')
        })
    },[])


    const onSubmit=async ()=>{
        if(selectedSub.length===VOTE_LIMIT){
            const batch = firebase.firestore().batch()
            const dbRef = firebase.firestore().collection('submissions')
            selectedSub.forEach(i=>{
                const data=mySubs[i]
                if(data.vote==="")
                    data.vote='0'
                if(!data.voters)
                    data.voters=[]

                batch.update(dbRef.doc(data.id),{
                    vote:parseInt(data.vote)+1,
                    voters:[...data.voters,currentUser.uid]
                })
            })

            await batch.commit()
            setSelectedSub([])
            window.location.reload();
        }else{
            toast.error('You must vote '+ VOTE_LIMIT + ' participants to submit')
        }
    }

    

    const showButton = () => {
        const element = document.getElementById('submit-vote');
        if(window.scrollY >= 1000){
            element.style.right = '0'
        }
        if(window.scrollY < 300){
            element.style.right = '-200px'
        }
    }

    window.addEventListener('scroll',showButton);

    return (
        <div className='competition-pg'>
            <div className='competition-content'>
                <div className='cover-img'>
                </div>
                <Card id={props.match.params.id} />
                <section className='section-submission'>
                    <Switch>
                        <Route path="/competition/participant" component={Leaderboard} />
                    </Switch>
                    <Leaderboard id={props.match.params.id} />
                    <h2 className='submission-title'>Submissions</h2>
                    {/* <SRLWrapper options={options}> */}
                        <div className='submissions'>

                            {
                                mySubs==''?<center><p>There is no submission yet.</p></center>:null
                            }
                            {
                                mySubs && mySubs.map((submission,i) => {
                                    return(
                                        <Submissions 
                                            submission={submission} 
                                            key={submission.id} 
                                            selected={selectedSub.includes(i)}
                                            onLike={()=>{
                                                if(selectedSub.includes(i))
                                                    setSelectedSub([...selectedSub.filter(x=>x!==i)])
                                                else 
                                                    setSelectedSub([...selectedSub,i])
                                        }} />
                                    )
                                })
                            }
                        </div>
                    {/* </SRLWrapper> */}
                            <a onClick={onSubmit} className='submitButton' id='submit-vote'>
                                Submit ({selectedSub.length}/{VOTE_LIMIT})
                            </a>
                </section>
            </div>
        </div>
    )
}


export default Competition
