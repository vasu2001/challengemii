import React, { useState } from 'react'
import { SRLWrapper } from "simple-react-lightbox";
import Nav from '../Nav-new/Nav'
import Submission from '../Submissions/Submissions'
import './login.css';
import './modal.css'

const Login = () => {
    const elements = [
        {
          src: 'https://source.unsplash.com/random/800x600',
          caption: 'Lorem ipsum dolor sit amet',
          width: 1920,
          height: 'auto'
        },
        {
          src: 'https://source.unsplash.com/random/800x600',
          thumbnail: 'https://source.unsplash.com/random/250x250',
          caption: 'Commodo commodo dolore',
          width: 1024,
          height: 'auto'
        },
        {
          src: 'https://source.unsplash.com/random/800x600',
          thumbnail:
            'https://source.unsplash.com/random/250x250',
          caption: 'Vimeo video',
          autoplay: false,
          showControls: true
        }
      ]
      const options = {

        buttons: {
            showAutoplayButton: false,
            showDownloadButton: false
        }
      };

    return (
        <div>
            <Nav />
            <SRLWrapper options={options}>
            <div className='wrapper-container'>
                <Submission imgSrc='https://source.unsplash.com/random/krishan'/>
                <Submission imgSrc='https://source.unsplash.com/random/none'/>
                <Submission imgSrc='https://source.unsplash.com/random/nne'/>
                <Submission imgSrc='https://source.unsplash.com/random/nne'/>
            </div>
            </SRLWrapper>
        </div>
    )
}

export default Login
