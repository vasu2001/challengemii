import React, { useEffect, useState } from 'react';
import './competitionStat.css';
import firebase from '../../firebase';
import VoteScreen from '../Vote-Screen/VoteScreen';

const db = firebase.firestore();

const CompetitionStat = () => {
   const [competitions, setCompetitions] = useState([]);
   const [display, setDisplay] = useState(false);

   useEffect(() => {
      db.collection('competitions')
         .get()
         .then((querySnap) => {
            setCompetitions(querySnap.docs.map((doc) => doc.data()));
         });
   }, []);

   const displayState = () => {
      setDisplay(false);
   };

   return (
      <div>
         <div className="competition-stat">
            {display ? <VoteScreen displayState={displayState} /> : null}
            <table>
               <thead>
                  <tr>
                     <th>Title</th>
                     <th>Starts</th>
                     <th>Ends</th>
                     <th>Participants</th>
                     <th>Prize</th>
                     <th>Votes</th>
                  </tr>
               </thead>
               <tbody>
                  {competitions &&
                     competitions.map((competition) => {
                        return (
                           <tr key={competition.id}>
                              <td data-column="Title">{competition.title}</td>
                              <td data-column="Starts">{competition.starts}</td>
                              <td data-column="Ends">{competition.ends}</td>
                              <td data-column="Participants">
                                 {competition.submissions}
                              </td>
                              <td data-column="Prize">{competition.prize}</td>
                              <td data-column="Votes">
                                 <a
                                    className=""
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setDisplay(true)}
                                 >
                                    Details
                                 </a>
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default CompetitionStat;
