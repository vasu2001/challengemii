import React, { useContext, useEffect, useState} from 'react'
import './participation.css'
import firebase from '../../firebase';
import image1 from '../../assets/banner.jpg';
import { AuthContext } from '../../Auth';
import Loading from '../../components/Loading/Loading';
import { toast } from 'react-toastify';

const db = firebase.firestore();

const Participation = (props) => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const [hidden, setHidden] = useState(true);
    const [photoUrl,setPhotoUrl] = useState('');
    const [videoLink,setVideoLink] = useState('');
    const [user_id, setUser_id] = useState('');
    const [user_name, setUser_name] = useState('');
    const [competition_id, setCompetition_id] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if(currentUser){
        setUser_id(currentUser.uid)
        setUser_name(currentUser.displayName)
        setCompetition_id(props.match.params.id)
        }
    },[currentUser])

    const defaultBtn = () => {
        const defaultBtn = document.querySelector('#choose-input');
        defaultBtn.click();
    }

    const handleInput = (e) => {
        setVideoLink(e.target.value)
    }

    const handleUpload = (e) => {
        if(e.target.files[0]){
            setPhotoUrl(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const storageRef = firebase.storage().ref(`images/${photoUrl.name}`);
        storageRef.put(photoUrl).then(snapshot => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Uploaded ', progress + '%');
            setLoading(false);
        }).then(() => {
            storageRef.getDownloadURL().then(downloadUrl => {
                db.collection('submissions').add({
                    competition_id,
                    photo_link: downloadUrl,
                    user_id,
                    user_name,
                    video_link: videoLink,
                    vote: 0,
                    voters:[]
                }).then(docRef => {
                    console.log('Document added: ', docRef.id);
                    toast.success('Congrats! Your submission has been successfully uploaded.')

                }).catch(error => {
                    console.log('error adding document', error);
                    toast.error('Sorry! We encountered some error uploading your submission.')
                })
            })
            db.collection('competitions').doc(competition_id).set({
                submissions: firebase.firestore.FieldValue.increment(1)
            },{merge:true}).then(() => {
                console.log('Document written');
            }).catch(err => {
                console.log(err);
            })
        })
    }

    return (
        <div className='participation-pg'>
            {
                loading?<Loading/>:null
            }
            <div className='participation-card'>
                <h3 className='card-title'>Upload your submission</h3>
                <div className='upload-img-container'>
                    {/* <img src=''></img> */}
                    <p>No file chosen, yet!</p>
                </div>
                <div className='action-container'>
                <input id='choose-input' onChange={handleUpload} type='file' hidden></input>
                <a className='btn-choose' onClick={defaultBtn}>Choose File</a>
                <div style={{marginTop:'30px'}}>
                    <p className={`yt-link ${hidden?'':'hide'}`} onClick={()=>setHidden(!hidden)}>Add link to your youtube video</p>
                    <input className={hidden?'hide':''} type='text' onChange={handleInput} placeholder='Youtube-link'></input>
                </div>
                </div>
                <a href={false} className='btn-submit' onClick={(e) => {
                    if(photoUrl !== ''){
                        setLoading(true);
                        handleSubmit(e); 
                    }
                    else{
                        toast.error('Choose a file to upload!');
                    }
                    }}>Submit</a>
            </div>
        </div>
    )
}

export default Participation
