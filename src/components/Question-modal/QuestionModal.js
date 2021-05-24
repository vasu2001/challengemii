import React, { useRef, useState } from 'react';
import './questionModal.css';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { toast } from 'react-toastify';

const QuestionModal = ({ ques, onRedeem, onClose }) => {
   const n = ques.length;
   const answers = useRef(ques.map((x) => '')).current;

   const [i, setI] = useState(0);
   const [ans, setAns] = useState('');

   const onNext = () => {
      if (ans == '') {
         toast.error('Answer the ques');
         return;
      }
      answers[i] = ans;

      if (i < n - 1) {
         setAns(answers[i + 1]);
         setI((i) => i + 1);
      } else {
         onRedeem(answers);
      }
   };
   const onPrev = () => {
      setAns(answers[i - 1]);
      setI((i) => i - 1);
   };

   return (
      <div className="question-modal">
         <div className="question-box">
            <div className="question-textbox">
               <a className="question-close" onClick={onClose}>
                  <GrClose />
               </a>
               <h4>Q.{i+1}) {ques[i]}</h4>
            </div>
            <div className="answer-textbox">
               <input
                  placeholder="Your answer"
                  value={ans}
                  onChange={(e) => setAns(e.target.value)}
               ></input>
               <div className="ques-nav">
                  <a className="ques-next" onClick={onPrev}>
                     {i > 0 ? <BsArrowLeft /> : null}
                  </a>
                  <a className="ques-next" onClick={onNext}>
                     {i < n - 1 ? <BsArrowRight /> : <AiOutlineCheck />}
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};

export default QuestionModal;
