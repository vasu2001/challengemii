import React from 'react'
import './submissions.css'

const Submissions = (props) => {

    // const [active,setActive] = React.useState(false);
    // const [count,setCount] = React.useState(0);
    // const [valid,setValid] = React.useState(true)

    // const voteCount = () => {
    //     setCount(count+1);
    //     console.log(count);
    //     count>1?setValid(false):setValid(true);
    // }
    // onClick={() => {valid?setActive(!active):alert("Only 3 votes are allowed"); voteCount();}}

    return (
        <div className={`submission ${"active"?"selected":""}`} >
            <div className='sub-head'>
                <p>Participant Name</p>
            </div>
            <div className='sub-img-container'>
             <img alt='' src={props.imgSrc} className='wrapper-img' />
            </div>
            <div className='vote-container'>
                <a href={()=>false} className='btn-vote'>Vote</a>
                <a href={()=>false} className='btn-vote'>Share</a>
            </div>
        </div>
    )
}

export default Submissions
