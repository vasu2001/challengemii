import React, { useState } from 'react'
import './nav.css';

import coins from '../../assets/coin.png'
import Modal from 'react-bootstrap/Modal'
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
            <a href='/profile/edit-profile' className='btn-login google'><img src={googleLogo} className='google-logo'/>Sign in with Google</a>
            <a href='/profile/edit-profile' className='btn-login fb'><img src={fbLogo} className='fb-logo'/>Sign in with Facebook</a>
            <a href='/profile/edit-profile' className='btn-login apple'><img src={appleLogo} className='apple-logo'/> Sign in with Apple</a>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

const Nav = () => {
    
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className='nav-new'>
            <p className="logo-new" onClick={() => {window.location ='/'}}>Challengemii</p>
            <div className='nav-items'>
                <img src={coins} alt='coins' className='coin-img'/>
                <p className='item-text'>90 Points</p>
                <a className='btn btn-signin' onClick={() => setModalShow(true)}>Sign in</a>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop='static'
            />
        </div>
    )
}

export default Nav
