import React, { Component } from 'react'
import './nav.css';

import coins from '../../assets/coin.png'
import Modal from 'react-bootstrap/Modal'
// import appleLogo from '../../assets/apple.png';
// import fbLogo from '../../assets/facebook.png'
// import googleLogo from '../../assets/google.svg'
// import navProfile from '../../assets/user.png'
import firebase from "../../firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => false
  }
}

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
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          </div>
        </Modal.Body>
      </Modal>
    );
  }

class Nav extends Component {
    
    constructor(props){
      super(props);
      this.state = {
        modalShow: false,
        isSigned: true,
        isVisible: false,
        loggedUser: {}
      }
    }
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
          this.setState({isSigned: !!user})
          this.setState({loggedUser: firebase.auth().currentUser})
          console.log('user: ', this.state.loggedUser)
        });
    }

    render() {
    return (
        <div className='nav-new'>
            <p className="logo-new" onClick={() => {window.location ='/'}}>Challengemii</p>
            <div className='nav-items'>
                <img src={coins} alt='coins' className='coin-img'/>
                <p className='item-text'>90 Points</p>
                {
                  this.state.isSigned ? (<div><div className='nav-profile-box'><img src={this.state.loggedUser.photoURL} alt='' className='nav-profile' onClick={()=>{this.setState({isVisible: !this.state.isVisible })}} /></div> <div className={this.state.isVisible ? "drop-down" : "drop-down-selected"}><p>Hi, {this.state.loggedUser.displayName}</p><p className='drop-down-links' onClick={()=> {window.location = ('/profile/edit-profile')} }>View Profile</p><p className='drop-down-links' onClick={() => firebase.auth().signOut()}>Sign out</p></div></div>) : (<a href={()=>false} className='btn btn-signin' onClick={() => this.setState({modalShow: true})}>Sign in</a>)
                }
            </div>
            <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={() => this.setState({modalShow: false})}
                backdrop='static'
            />
        </div>
    )
}
}

export default Nav
