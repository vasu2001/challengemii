import React from 'react'
import './side.css'

const Side = () => {
    return (
        <div>
            <div className='admin-side-nav'>
                    <div className='admin-photo'></div>
                    <h4 className='admin-name'>Admin</h4>
                    <ul className='admin-side-nav-items'>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/admin-panel/host'}}>Host Competition</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/admin-panel/stat'}}>Competition Stats</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/admin-panel/redeem-req'}}>Redeem requests</li>
                        <li className='admin-side-nav-links' onClick={()=>{window.location = '/admin-panel/add-prize'}}>Add prize</li>
                    </ul>
            </div>
        </div>
    )
}

export default Side
