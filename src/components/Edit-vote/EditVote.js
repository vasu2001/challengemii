import React, {useState, useEffect} from 'react'
import './editVote.css'
import firebase from '../../firebase'
import CardNew from '../Cards-new/CardNew'

const db = firebase.firestore()
const EditVote = () => {

    const [competitions,setCompetitions] = useState([])

    // getting all competitions from firestore 
    useEffect(() => {
        db.collection('competitions').get().then(querySnap => {
            setCompetitions(querySnap.docs.map(x=>({data:x.data(),id:x.id})))
        })
    },[])

    return (
        <div className='edit-vote'>
            {competitions && competitions.map(competition => {
                        return(
                            <CardNew competition={competition} key={competition.id} />
                        )
                    })}
        </div>
    )
}

export default EditVote
