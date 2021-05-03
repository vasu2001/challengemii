import React from 'react'
import coins from '../../assets/coin.png'
import Modal from 'react-bootstrap/Modal'
import appleLogo from '../../assets/apple.png';
import fbLogo from '../../assets/facebook.png'
import googleLogo from '../../assets/google.svg'
import navProfile from '../../assets/user.png'


import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

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
            <a href='' className='btn-login google'><img src={googleLogo} alt='' className='google-logo'/>Sign in with Google</a>
            <a href='/profile/edit-profile' className='btn-login fb'><img src={fbLogo} alt=''  className='fb-logo'/>Sign in with Facebook</a>
            <a href='/profile/edit-profile' className='btn-login apple'><img src={appleLogo} alt='' className='apple-logo'/> Sign in with Apple</a>
          </div>
        </Modal.Body>
      </Modal>
    );
}
const Login = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn();
        console.log(props);
    }
    return (
        <div className='nav-new'>
            <p className="logo-new" onClick={() => {window.location ='/'}}>Challengemii</p>
            <div className='nav-items'>
                <img src={coins} alt='coins' className='coin-img'/>
                <p className='item-text' onClick={handleSubmit}>90 Points</p>
                {/* <a className='btn btn-signin' onClick={() => setModalShow(true)}>Sign in</a> */}
                <a className='btn btn-signin' onClick={handleSubmit}>Sign in</a>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop='static'
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signIn: () => dispatch(signIn())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
