import React, { useEffect, useState } from 'react'
import './basic.css';

const Basic = (props) => {

    const userData = props.user;

    const [userDetails, setUserDetails] = useState({
        name: userData.name,
        desc: '',
        website: '',
        twitter: '',
        instagram: '',
        facebook: '',
        linkedin: ''
    })

    const handleChange = (e)=>{
        setUserDetails({
            ...userDetails,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    if(userData){
        console.log(userDetails);
    return(
        <div>
            <div className='main-container'>
                    <div className='basic-info'>
                        <p>Basics:</p>
                        <input type='text' className='input-field' id='name' onChange={handleChange} placeholder='Full Name' defaultValue={userData.name}></input>
                        <textarea className='input-description' id='desc' onChange={handleChange} rows='15' placeholder='Tell something about yourself'></textarea>
                    </div>
                        <hr style={{marginBottom:'50px'}}/>
                    <div className='social-info'>
                        <p>Social Links:</p>
                        <input type='text' className='input-field' id='website' onChange={handleChange} placeholder='Website (https:...)'></input>
                        <div className='social-box'>
                            <div className='social-title'>
                                <p className='social-link-head'>https:twitter.com/</p>
                            </div>
                            <input type='text' name='twitter-link' className='input-field social' id='twitter' onChange={handleChange} placeholder='Twitter Profile'></input>
                        </div>
                        <label for='twitter-link' className='input-label'>Add your twitter username (e.g. tomcruise11)</label>
                        <div className='social-box'>
                            <div className='social-title'>
                                <p className='social-link-head'>https:instagram.com/</p>
                            </div>
                            <input type='text' name='insta-link' className='input-field social' id='instagram' onChange={handleChange} placeholder='Instagram Profile' value={userData.instagram}></input>
                        </div>
                        <label for='insta-link' className='input-label'>Add your instagram username (e.g. tomcruise11)</label>
                        <div className='social-box'>
                            <div className='social-title'>
                                <p className='social-link-head'>https:www.facebook.com/</p>
                            </div>
                            <input type='text' name='fb-link' className='input-field social' id='facebook' onChange={handleChange} placeholder='Facebook Profile'></input>
                        </div>
                        <label for='fb-link' className='input-label'>Add your facebook username (e.g. tomcruise11)</label>
                        <div className='social-box'>
                            <div className='social-title'>
                                <p className='social-link-head'>https:linkedin.com/</p>
                            </div>
                            <input type='text'  name='linkedin-link' className='input-field social' id='linkedin' onChange={handleChange} placeholder='LinkedIn Profile'></input>
                        </div>
                        <label for='linkedin-link' className='input-label'>Add your linkedin username (e.g. tomcruise11)</label>
                    </div>
                    <div className='save'>
                        <a href={()=>false} className='btn-save'>Save</a>
                    </div>
                </div>
            </div>
    )
    }
    else{
        return(
            <center>
                <h3>Loading...</h3>
            </center>
        )
    }
}


export default Basic