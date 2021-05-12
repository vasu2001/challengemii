import React from 'react'
import './side.css'
const Side = (props) => {

    const profilePhoto = {
        backgroundImage: "url(" + props.user.photoURL + ")"
    }
    return (
        <div>
            <div className='side-nav'>
                    <div className='profile-photo'>
                        <img alt='' src={props.user.photoURL} className='profile-photo-img'/>
                    </div>
                    <h4 className='profile-name'>Profile Name</h4>
                    <ul className='side-nav-items'>
                        <li className='side-nav-links' onClick={()=>{window.location = '/user/username'}}>View public profile</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/edit-profile'}}>Profile</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/past-competitions'}}>Past Competitions</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/my-competitions'}}>My Competitions</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/manage-coins'}}>Manage Coins</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/manage-coins'}}>Manage Tickets</li>
                        <li className='side-nav-links' onClick={()=>{window.location = ''}}>Close Account</li>
                    </ul>
                </div>
        </div>
    )
}

export default Side
