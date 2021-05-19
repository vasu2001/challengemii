import React, {useState, useEffect} from 'react'
import './editVote.css'
import firebase from '../../firebase'
import CardNew from '../Cards-new/CardNew'
import moment from 'moment'
import VoteScreen from '../Vote-Screen/VoteScreen'

const db = firebase.firestore()
const EditVote = () => {

    const [competitions,setCompetitions] = useState([])
    const [display,setDisplay] = useState(false);
    
    // getting all competitions from firestore 
    useEffect(() => {
        db.collection('competitions').get().then(querySnap => {
            setCompetitions(querySnap.docs.map(x=>({data:x.data(),id:x.id})))
        })
    },[])

    const displayState = () => {
        setDisplay(false);
    }

    return (
        <div className='edit-vote'>
         {
            display?<VoteScreen displayState={displayState} />:null
         }
        <ol>
            {competitions && competitions.map((competition,key) => {
                        return(
                            <li onClick={() => setDisplay(true)}><span>{key+1}</span>{competition.data.title}<span>{moment(competition.data.ends).format("D MMM, YYYY h:mm a")}</span></li>
                        )
                    })}
        </ol>
        </div>
    )
}

export default EditVote
