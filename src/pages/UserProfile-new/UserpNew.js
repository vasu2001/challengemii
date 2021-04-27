import React from 'react'
import Nav from '../../components/Nav-new/Nav'
import './userpNew.css'
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import Footer from '../../components/Footer/Footer';


const UserpNew = () => {
    return (
        <div>
            <Nav />
            <div className='user-profile-new'>
                <div className='profile-dp-new'></div>
                <div className='social-container-new'>
                    <div className='social-link-new'>
                        <AiOutlineInstagram style={{transform: 'scale(1.5)'}} />  
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
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserpNew
