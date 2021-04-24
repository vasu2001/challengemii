import React from 'react'
import './submissions.css'

const Submissions = () => {

    const [active,setActive] = React.useState(false);
    const [count,setCount] = React.useState(0);
    const [valid,setValid] = React.useState(true)

    const voteCount = () => {
        setCount(count+1);
        console.log(count);
        count>1?setValid(false):setValid(true);
    }

    return (
        <div className={`submission ${active?"selected":""}`} onClick={() => {valid?setActive(!active):alert("Only 3 votes are allowed"); voteCount();}}>
        
        </div>
    )
}

export default Submissions
