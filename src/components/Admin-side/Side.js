import React from 'react'
import './side.css'

const Side = () => {
    return (
        <div>
            <div className='admin-side-nav'>
                    <div className='admin-photo'></div>
                    <h4 className='admin-name'>Profile Name</h4>
                    <ul className='admin-side-nav-items'>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/profile/username'}}>Host Competition</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/profile/edit-profile'}}>Profile</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/profile/edit-photo'}}>Photo</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/profile/past-competitions'}}>Past Competitions</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/profile/my-competitions'}}>My Submissions</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = ''}}>Manage Coins</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = ''}}>Close Account</li>
                    </ul>
            </div>
        </div>
    )
}

export default Side
