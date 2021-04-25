import React from 'react'
import Side from '../../components/Admin-side/Side'
import Nav from '../../components/Nav-new/Nav'
import { Route,Switch } from 'react-router-dom';
import './admin.css'
import Top from '../../components/Profile-top/Top';
import Basic from '../../components/Basic-info/Basic';


const Admin = () => {
    return (
        <div>
            <Nav />
            <div className='admin-container'>
                <Side />
                <div className='nav-main'>
                   <Top title='Host a Competition' />
                   <Basic />
                </div>
            </div>
        </div>
    )
}

export default Admin
