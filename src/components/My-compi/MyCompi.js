import React, { useEffect, useState } from 'react'
import './myCompi.css'
import Submissions from '../../components/Submissions/Submissions';
import firebase from '../../firebase';
import { Component } from 'react';

const db = firebase.firestore();


const MyCompi = (props) => {
    const [submissions, setSubmissions] = useState([]);
    const user_id = props.user;

    useEffect(() => {
        db.collection('submissions').where('user_id', '==', user_id).get().
        then(querySnap => {
            querySnap.forEach(doc => {
                setSubmissions(prevState => [...prevState, doc.data()])
            })
        })
    },[])

    console.log(submissions);
    return (
        <div>
            <div className='my-compi'>
                <div className='my-compi-container'>
                    {
                        submissions && submissions.map(submission => {
                            return(
                                <Submissions submission={submission} key={submission.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


// class MyCompi extends Component {

//     state = {
//         submissions : []
//     }

//     componentDidMount(){
//         db.collection('submissions').where('user_id', '==', this.props.user.uid)
//         .get()
//         .then((querySnap) => {
//             querySnap.forEach((doc) => {
//                 this.setState(prevState => ({
//                     submissions: [...prevState.submissions,doc.data()]
//                 }))
//             });
//         })
//         .catch((err) => {
//             console.log('Error getting documents: ', err);
//         })
//     }

//     render(){
//     if(this.state.submissions){
//     return (
//         <div>
//             <div className='my-compi'>
//                 <div className='my-compi-container'>
//                     {/* <Submissions imgSrc='https://source.unsplash.com/random/krishan'/>
//                     <Submissions imgSrc='https://source.unsplash.com/random/none'/>
//                     <Submissions imgSrc='https://source.unsplash.com/random/nne'/>
//                     <Submissions imgSrc='https://source.unsplash.com/random/nne'/> */}
//                     {
//                         this.state.submissions && this.state.submissions.map(submission => {
//                             return(
//                                 <Submissions submission={submission} key={submission.id} />
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//         </div>
//     )
//     }
//     else{
//         <center>
//             <div>Loading...</div>
//         </center>
//     }
// }
// }

export default MyCompi
