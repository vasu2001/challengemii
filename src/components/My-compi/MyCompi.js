import React, { useEffect, useState } from 'react';
import './myCompi.css';
import Submissions from '../../components/Submissions/Submissions';
import firebase from '../../firebase';
import { Component } from 'react';

const db = firebase.firestore();

const MyCompi = (props) => {
   const [submissions, setSubmissions] = useState([]);
   const user_id = props.user;

   useEffect(() => {
      db.collection('submissions')
         .where('user_id', '==', user_id)
         .get()
         .then((querySnap) => {
            querySnap.forEach((doc) => {
               setSubmissions((prevState) => [...prevState, doc.data()]);
            });
         });
   }, []);

   console.log(submissions);
   return (
      <div>
         <div className="my-compi">
            <div className="my-compi-container">
               {submissions &&
                  submissions.map((submission) => {
                     return (
                        <Submissions
                           submission={submission}
                           key={submission.id}
                        />
                     );
                  })}
            </div>
         </div>
      </div>
   );
};

export default MyCompi;
