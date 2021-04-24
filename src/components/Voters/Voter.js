import React from 'react'
import Submissions from '../../components/Submissions/Submissions';
import Leaderboard from '../Leaderboard/Leaderboard';
import './voter.css'

const Voter = () => {
    return (
        <div className='Voter'>
            <div className='submission-container'>
                <Leaderboard />
                <p style={{fontSize:'28px'}}>SUBMISSIONS</p>
                <div className='card-container'>
                    <Submissions />
                    <Submissions />
                    <Submissions />
                    <Submissions />
                    <Submissions />
                    <Submissions />
                    <Submissions />
                    <Submissions />
                    <Submissions />
                </div>               
            </div>
        </div>
    )
}

export default Voter
