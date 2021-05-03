import React, { useEffect, useState } from 'react'
import './participation.css'
import Nav from '../../components/Nav-new/Nav'
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { createSubmission } from '../../store/actions/submissionAction';
import { Component } from 'react';

class Participation extends Component {
    // const [userId,setUserId] = useState('');
    // const [inputField, setInputField] = useState({
    //   photo_link : '',
    //   video_link : 'zakde',
    //   user_id : '12345',
    //   competition : '' 
    // })
    state = {
        photo_link: '',
        video_link: '',
        user_id: '',
        competition_id: ''
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            this.setState({user_id: user.uid})
        })
        this.setState({competition_id: this.props.match.params.id });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createSubmission(this.state);
    }
    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if(user)
    //         setUserId(user.uid);    
    //     })
    //     console.log(inputField);
    // },[inputField])

    // console.log(userId);
    // console.log(props.match.params.id);

    // const inputsHandler = (e) => {
    //     setInputField({[e.target.name]: e.target.value})
    // }

    // const submitHandle = (e) => {
    //     setInputField({user_id: '123455'})
    //     console.log(inputField);
    // }
    render(){
        console.log('state', this.state);
        console.log(this.props);    
    return (
        <div>
            <div className='participation-pg'>
                <Nav />
                <div className='participation-container'>
                    <div className='participation-main'>
                        <div className='upload-photo'>
                            <h4>Upload your submission</h4>
                            <div className='parti-img-container' style={{backgroundImage: "url(https://source.unsplash.com/random/krishan",backgroundSize:'contain',backgroundRepeat: 'no-repeat', backgroundPosition:'center'}}>
                            </div>
                            <div className='inputfile-container '>
                                {/* <input type='file' name='photo_link' onChange={inputsHandler}></input> */}
                                <input type='text' name='photo_link' onChange={this.handleChange} className='input-field' placeholder='Picture link'></input>

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
