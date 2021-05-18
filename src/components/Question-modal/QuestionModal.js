import React from 'react'
import './questionModal.css'
import {BsArrowRight} from 'react-icons/bs'
import {GrClose} from 'react-icons/gr'

const QuestionModal = (props) => {
    return (
        <div className='question-modal'>
            <div className='question-box'>
                <div className="question-textbox">
                    <a className='question-close' onClick={props.displayState}><GrClose /></a>
                    <h4>Write about your overall experience of application.</h4>
                </div>
                <div className='answer-textbox'>
                    <input placeholder='Your answer'></input>
                    <a><BsArrowRight /></a>
                </div>
            </div>
        </div>
    )
}

export default QuestionModal
