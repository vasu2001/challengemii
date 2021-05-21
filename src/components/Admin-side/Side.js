import React from 'react'
import {useHistory} from 'react-router-dom'
import './side.css'

const Side = () => {

    const history = useHistory();
    return (
        <div>
            <div className='admin-side-nav'>
                    <div className='admin-photo'></div>
                    <h4 className='admin-name'>Admin</h4>
                    <ul className='admin-side-nav-items'>
                        <li className='admin-side-nav-links' onClick={() => history.push('/admin-panel/host')}>Host Competition</li>
                        <li className='admin-side-nav-links' onClick={()=> history.push('/admin-panel/stat')}>Competition Stats</li>
                        <li className='admin-side-nav-links' onClick={()=> history.push('/admin-panel/redeem-req')}>Redeem requests</li>
                        <li className='admin-side-nav-links' onClick={()=> history.push('/admin-panel/add-prize')}>Add prize</li>
                    </ul>
            </div>
        </div>
    )
}

export default Side
