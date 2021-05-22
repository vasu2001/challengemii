import React from 'react';
import './voteScreen.css';
import { GrClose } from 'react-icons/gr';

const VoteScreen = (props) => {
   return (
      <div className="vote-screen">
         <div className="vote-box">
            <a className="close-vote" onClick={props.displayState}>
               <GrClose />
            </a>
            <center>
               <h4>Votes</h4>
            </center>
            <ol style={{ marginTop: '20px' }}>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
               <li>
                  <span>1</span>Name
                  <span>
                     <input style={{ width: '60px' }}></input>
                  </span>
               </li>
            </ol>
         </div>
      </div>
   );
};

export default VoteScreen;
