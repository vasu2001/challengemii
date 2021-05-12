import React, {Component} from 'react'
import './participation.css'
import Nav from '../../components/Nav-new/Nav'
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { createSubmission } from '../../store/actions/submissionAction';
import { Redirect } from 'react-router';


class Participation extends Component {
    state = {
        photo_link: null,
        video_link: '',
        user_id: '',
        user_name: '',
        competition_id: '',
        vote: '',
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
            this.setState({user_id: user.uid})
            this.setState({user_name: user.displayName})
            }
        })
        this.setState({competition_id: this.props.match.params.id });
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleUpload = (e) => {
        if(e.target.files[0]){
            this.setState({photo_link : e.target.files[0]});
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();

        const storageRef = firebase.storage().ref(`images/${this.state.photo_link.name}`);
        storageRef.put(this.state.photo_link).then(snapshot => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Uploaded ', progress + '%');
        }).then(() => {
            storageRef.getDownloadURL().then(downloadURL => {
                console.log('file at: ', downloadURL);
                this.setState({photo_link: downloadURL});
                this.props.createSubmission(this.state);
            })
        })
    }

    render(){
        // if(!this.props.contextUser) return <Redirect to={'/all-competitions'} />
            return (
                <div>
                    <div className='participation-pg'>
                        <div className='participation-container'>
                            <div className='participation-main'>
                                <div className='upload-photo'>
                                    <h4>Upload your submission</h4>
                                    <div className='parti-img-container' style={{backgroundImage: `url(${this.state.photo_link?this.state.photo_link:'http://placehold.jp/250x250.png'})`,backgroundSize:'contain',backgroundRepeat: 'no-repeat', backgroundPosition:'center'}}>
                                    </div>
                                    <div className='inputfile-container '>
                                        <input type='file' name='photo_link' onChange={this.handleUpload}></input>
                                    </div>
                                </div>
                                <div className='upload-video'>
                                <hr />
                                <input type='text' name='video_link' onChange={this.handleChange} className='input-field' placeholder='Youtube video link'></input>
                                <div style={{marginTop:'30px'}}>
                                    <a href={()=>false} onClick={this.handleSubmit} className='btn-upload' >Upload</a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
}



const mapDispatchToProps = (dispatch) => {
    return{ 
        createSubmission: (submission) => dispatch(createSubmission(submission))
    }
}

export default connect(null,mapDispatchToProps)(Participation)
