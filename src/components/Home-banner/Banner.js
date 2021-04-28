import React from 'react'
import './banner.css'

import Modal from 'react-bootstrap/Modal'
// import {GiHamburgerMenu} from 'react-icons/gi'
import appleLogo from '../../assets/apple.png';
import fbLogo from '../../assets/facebook.png'
import googleLogo from '../../assets/google.svg'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        dialogClassName='modal-50w'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
            textAlign: 'center',
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" > 
            <p>Login</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='login-container'>
            <a href='/profile/edit-profile' className='btn-login google'><img alt='' src={googleLogo} className='google-logo'/>Sign in with Google</a>
            <a href='/profile/edit-profile' className='btn-login fb'><img alt='' src={fbLogo} className='fb-logo'/>Sign in with Facebook</a>
            <a href='/profile/edit-profile' className='btn-login apple'><img alt='' src={appleLogo} className='apple-logo'/> Sign in with Apple</a>
          </div>
        </Modal.Body>
      </Modal>
    );
  }


const Banner = () => {
    
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className='home-banner'>
            <div className='navbar'>
                <h1 className="banner-logo">Challenge<span className='logo-secondary-part'>mii</span></h1>
                <div className='homenav-right'>
                    <a href='/all-competitions' className='nav-link'>Competitions</a>
                    <div className='hamburger-container'>
                        {/* <GiHamburgerMenu className="hamburger" /> */}
                        <p onClick={() => setModalShow(true)}>Sign In</p>
                    </div>
                </div>
                <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop='static'
            />
            </div>
                <div className='banner-titlebox'>
                    <h1 className='title-heading'>Learn. Earn. <span id='title-heading'>Compete.</span></h1>
                    <h1 className='title-heading-sub'>Compete with the <span id='title-heading-sub'>best.</span></h1>
                    <a href='/all-competitions' className='btn btn-compete'>Compete<span style={{color:'#cd1010'}}> Now!</span></a>
                </div>
        </div>
    )
}

export default Banner
