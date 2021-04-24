import React from 'react'
import './leaderboard.css';
import {FaTrophy} from 'react-icons/fa'

const Leaderboard = () => {
    return (
        <div>
            <h2 className='submission-title'>LEADERBOARD</h2>
                <div className="leaderboard">
                <ol>
                    <li>Participant 1</li>
                    <li>Participant 2</li>
                    <li>Participant 3</li>
                    <li>Participant 4</li>
                    <li>Participant 5</li>
                    <li>Participant 6</li>
                    <li>Participant 7</li>
                    <li>Participant 8</li>
                    <li>Participant 9</li>
                </ol>
                </div>
        </div>
    )
}

export default Leaderboard
