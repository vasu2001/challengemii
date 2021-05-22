import React, {Component, useState} from 'react'
import './hostCompetition.css'
import firebase from '../../firebase';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';

const db = firebase.firestore();


class HostCompetiton extends Component {

    state = {
        title: '',
        tagline: '',
        starts: '',
        ends: '',
        prize: '',
        fees: '',
        coverUrl: '',
        loading: false
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleUpload = (e) => {
        this.setState({
            coverUrl: e.target.files[0] 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const storageRef = firebase.storage().ref(`compi-covers/${this.state.coverUrl.name}`);
        storageRef.put(this.state.coverUrl)
        .then(snapshot => {
            console.log('Uploaded');
        }).then(() => {
            storageRef.getDownloadURL().then(downloadUrl => {
                db.collection('competitions').add({
                    title: this.state.title,
                    tagline: this.state.tagline,
                    starts: this.state.starts,
                    ends: this.state.ends,
                    prize: this.state.prize,
                    fees: this.state.fees,
                    coverUrl: downloadUrl,
                    submissions: 0
                }).then(docRef => {
                    this.setState({loading: false});
                    toast.success('Competition added successfully');
                }).catch(err => {
                    toast.error('Error adding document');
                })
            })
        })
    }
    render() {
    return (
        <div>
            {
                this.state.loading?<Loading />:null
            }
            <div className='host-competition'>
                <p>Competition Title:</p>
                <input type='text' onChange={this.handleChange} id='title' className='input-field host-field' placeholder='Title'></input>
                <p>Competition Tagline:</p>
                <input type='text' onChange={this.handleChange} id='tagline' className='input-field host-field' placeholder='Tagline'></input>
                <p>Starts at:</p>
                <input type='datetime-local' onChange={this.handleChange} id='starts' className='input-field host-field'></input>
                <p>End at:</p>
                <input type='datetime-local' onChange={this.handleChange} id='ends' className='input-field host-field'></input>
                <p>Winning prize:</p>
                <input type='number' onChange={this.handleChange} id='prize' className='input-field host-field' placeholder=''></input>
                <p>Entry fees:</p>
                <input type='number' onChange={this.handleChange} id='fees' className='input-field host-field' placeholder=''></input>
                <p>Upload competition cover</p>
                <input id='choose-input' onChange={this.handleUpload} type='file'></input>
            </div>
            <div className='save'>
                    <a onClick={(e)=>{this.setState({loading:true});this.handleSubmit(e)}} className='btn-save'>Save</a>
            </div>
        </div>
    )
    }
}

export default HostCompetiton
