import React, { useState, useEffect } from 'react';
import './redeemDetails.css';
import { BsArrowRight } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import Fade from 'react-reveal/Fade';
import firebase from '../../firebase';

const RedeemDetails = ({ close, data }) => {
   const [questions, setQuestion] = useState([]);

   useEffect(() => {
      firebase
         .firestore()
         .collection('prizes')
         .doc(data.prize_id)
         .get()
         .then((doc) => {
            setQuestion(doc.data());
         });
   }, []);

   console.log(questions.ques);

   return (
      <div className="redeem-details">
         <div className="redeem-details-card">
            <a className="redeem-details-close" onClick={close}>
               <GrClose />
            </a>
            <h3>Prize Details</h3>
            <div className="detail-box">
               <p>
                  Name:<span>{data.name}</span>
               </p>
               <p>
                  Prize Title:<span>{data.title}</span>
               </p>
               <p>
                  Prize coins:<span>{data.coins}</span>
               </p>
            </div>
            <h4>Questions</h4>
            <div className="quest-box">
               <ul>
                  {questions.ques &&
                     questions.ques.map((question, i) => {
                        let answers = data.answers;
                        return (
                           <li className="quest">
                              <span>Q.1)</span>
                              {question}
                              <li className="ans">
                                 <span>
                                    <BsArrowRight />
                                 </span>
                                 {answers[i]}
                              </li>
                           </li>
                        );
                     })}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default RedeemDetails;
