import React from 'react'
import Nav from '../../components/Nav-new/Nav'
import Footer from '../../components/Footer/Footer'
import Card from '../../components/Cards/cards'
import './userProfile.css'

import { BsLink } from 'react-icons/bs';
import { AiOutlineTwitter } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';

const UserProfile = () => {
    return (
        <div>
            <div className='user-profile'>
                <div className='user-content'>
                <div className='side-left'>
                    <h1 className='username-text'>Profile Name</h1>
                    <p className='designation-text'>Designation</p>
                    <div className='user-info'>
                        <div className='user-info-container'>
                            <p className='user-info-title'>Competitions</p>
                            <p className='user-info-text'>12</p>
                        </div>
                        <div className='user-info-container'>
                            <p className='user-info-title'>Won</p>
                            <p className='user-info-text'>7</p>
                        </div>
                        <div className='user-info-container'>
                            <p className='user-info-title'>Earned</p>
                            <p className='user-info-text'>2400</p>
                        </div>
                    </div>
                    <div className='social-handles mobile'>
                        <a href={()=>false} className='btn-handles'><span><BsLink className='handle-icons'/></span>Website</a>
                        <a href={()=>false} className='btn-handles'><span><AiOutlineTwitter className='handle-icons twitter'/></span>Twitter</a>
                        <a href={()=>false} className='btn-handles'><span><AiFillInstagram className='handle-icons twitter'/></span>Instagram</a>
                        <a href={()=>false} className='btn-handles'><span><AiFillFacebook className='handle-icons twitter'/></span>Facebook</a>
                        <a href={()=>false} className='btn-handles'><span><AiFillLinkedin className='handle-icons twitter'/></span>LinkedIn</a>
                    </div>
                    <div className='user-about'>
                        <p className='user-about-title'>About me</p>
                        <p className='user-about-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis mi lacinia, venenatis nibh ut, sodales lorem. Cras vulputate risus vitae mollis varius. Aliquam fermentum, lorem eget placerat congue, ante metus lacinia nisi, eu molestie arcu mauris in lacus. Praesent placerat sollicitudin urna, ut mollis felis dapibus eu. Ut id lorem pulvinar, ornare nulla quis, pellentesque nunc. Donec consectetur fermentum dolor, in ultricies ante finibus nec. Pellentesque id mattis nisl, vel congue arcu. Nam arcu diam, varius in purus quis, ultricies malesuada purus. Phasellus ligula eros, viverra eu placerat eu, laoreet sed magna.</p>
                        <p className='user-about-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis mi lacinia, venenatis nibh ut, sodales lorem. Cras vulputate risus vitae mollis varius. Aliquam fermentum, lorem eget placerat congue, ante metus lacinia nisi, eu molestie arcu mauris in lacus. Praesent placerat sollicitudin urna, ut mollis felis dapibus eu. Ut id lorem pulvinar, ornare nulla quis, pellentesque nunc. Donec consectetur fermentum dolor, in ultricies ante finibus nec. Pellentesque id mattis nisl, vel congue arcu. Nam arcu diam, varius in purus quis, ultricies malesuada purus. Phasellus ligula eros, viverra eu placerat eu, laoreet sed magna.</p>
                    </div>
                </div>
                <div className='side-right'>
                    <div className='profile-photo public'></div>
                    <div className='social-handles desktop'>
                        <a href={()=>false}className='btn-handles'><span><BsLink className='handle-icons'/></span>Website</a>
                        <a href={()=>false}className='btn-handles'><span><AiOutlineTwitter className='handle-icons twitter'/></span>Twitter</a>
                        <a href={()=>false}className='btn-handles'><span><AiFillInstagram className='handle-icons twitter'/></span>Instagram</a>
                        <a href={()=>false}className='btn-handles'><span><AiFillFacebook className='handle-icons twitter'/></span>Facebook</a>
                        <a href={()=>false}className='btn-handles'><span><AiFillLinkedin className='handle-icons twitter'/></span>LinkedIn</a>
                    </div>
                </div>
                </div>
                <div className='user-competitions'>
                        <p className='user-about-title competition'>My Competitions</p>
                        <div className='user-competitions-container'>
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile
