import React from 'react'
import './profileDp.css';

import dp from '../../assets/profile-dp.jpeg';

const ProfileDP = () => {
    return (
        <div>
            <div className='photo-edit'>
                <p>Image preview:</p>
                <div className='img-container'>
                    <img src={dp} className='profile-img' />
                </div>
                <p>Add / Change Image:</p>
                <div className='upload'>
                    <input className='input-field profile-upload' placeholder='No file selected'></input>
                    <div className='upload-btn'>
                        Upload 
                    </div>
                </div>
            </div>
                <hr/>
                <div className='save'>
                    <a href='' className='btn-save'>Save</a>
                </div>
        </div>
    )
}

export default ProfileDP
