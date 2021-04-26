import React from 'react'
import './hostCompetition.css'

const HostCompetiton = () => {
    return (
        <div>
            <div className='host-competition'>
                <p>Competition Title:</p>
                <input type='text' className='input-field host-field' placeholder='Title'></input>
                <p>Competition Tagline:</p>
                <input type='text' className='input-field host-field' placeholder='Tagline'></input>
                <p>Starts at:</p>
                <input type='datetime-local' className='input-field host-field'></input>
                <p>End at:</p>
                <input type='datetime-local' className='input-field host-field'></input>
                <p>Winning prize:</p>
                <input type='number' className='input-field host-field' placeholder=''></input>
                <p>Entry fees:</p>
                <input type='number' className='input-field host-field' placeholder=''></input>
            </div>
            <div className='save'>
                    <a href='' className='btn-save'>Save</a>
            </div>
        </div>
    )
}

export default HostCompetiton
