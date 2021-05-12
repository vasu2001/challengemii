import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav-new/Nav'
import './userpNew.css'
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import Footer from '../../components/Footer/Footer';
import firebase from '../../firebase';
import Submissions from '../../components/Submissions/Submissions';

const db = firebase.firestore();

const UserpNew = () => {

    const[currentUser, setCurrentUser] = useState({})
    const[userData, setUserData] = useState({})
    const[submissions, setSubmissions] = useState([])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
            setCurrentUser(user)
            db.collection('users').doc(user.uid).get().then(doc => {
                if(doc.exists){
                    setUserData(doc.data());
                }
                else{
                    console.log('No such documents');
                }
            })
            db.collection('submissions').where('user_id', '==', user.uid).get().then(querySnap => {
                querySnap.forEach(doc => {
                    setSubmissions(prevState => [...prevState, doc.data()]);
                })
            })
            }
            else{
                alert('User not logged in');
            }
        })
    },[]) 
    console.log(currentUser);
    console.log(userData);
    return (
        <div>
            <Nav />
            <div className='user-profile-new'>
                <div className='profile-dp-new' style={{backgroundImage: `url(${currentUser.photoURL})`}}></div>
                <div className='social-container-new'>
                    <div className='social-link-new'>
                        <a href={userData.instagram} target="_blank" rel='noreferrer'><AiOutlineInstagram style={{transform: 'scale(1.5)'}} /></a>
                    </div>
                    <div className='social-link-new'>
                        <AiFillFacebook style={{transform: 'scale(1.8)'}} />  
                    </div>
                    <div className='social-link-new'>
                        <FaTwitter style={{transform: 'scale(1.5)'}} />  
                    </div>
                    <div className='social-link-new'>
                        <AiFillLinkedin style={{transform: 'scale(1.5)'}} />  
                    </div>
                </div>
                <div className='profile-content-new'>
                    <div className='content-top'>
                        <h3>{userData.name}</h3>
                        <div className='about-para-new'>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                        </div>
                    </div>
                    <div className='content-submissions'>
                        <h3>Submissions</h3>
                        <div className='submission-holder'>
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
            </div>
            <Footer />
        </div>
    )
}

export default UserpNew
