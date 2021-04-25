import React from 'react'
import './myCompi.css'
import Submissions from '../../components/Submissions/Submissions';

const MyCompi = () => {
    return (
        <div>
            <div className='my-compi'>
                <div className='my-compi-container'>
                    <Submissions imgSrc='https://source.unsplash.com/random/krishan'/>
                    <Submissions imgSrc='https://source.unsplash.com/random/none'/>
                    <Submissions imgSrc='https://source.unsplash.com/random/nne'/>
                    <Submissions imgSrc='https://source.unsplash.com/random/nne'/>
                </div>
            </div>
        </div>
    )
}

export default MyCompi
