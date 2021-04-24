import React from 'react'
import './side.css'
const Side = () => {
    return (

        <div>
            <div className='side-nav'>
                    <div className='profile-photo'></div>
                    <h4 className='profile-name'>Profile Name</h4>
                    <ul className='side-nav-items'>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/username'}}>View public profile</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/edit-profile'}}>Profile</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/edit-photo'}}>Photo</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/past-competitions'}}>Past Competitions</li>
                        <li className='side-nav-links' onClick={()=>{window.location = '/profile/my-competitions'}}>My Competitions</li>
                        <li className='side-nav-links' onClick={()=>{window.location = ''}}>Manage Coins</li>
                        <li className='side-nav-links' onClick={()=>{window.location = ''}}>Close Account</li>
                    </ul>
                </div>
        </div>
    )
}

export default Side
