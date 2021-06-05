import React, { useEffect, useState } from 'react';
import './competitionStat.css';
import firebase from '../../firebase';
import VoteScreen from '../Vote-Screen/VoteScreen';
import { Link } from 'react-router-dom';

const db = firebase.firestore();

const CompetitionStat = () => {
   const [competitions, setCompetitions] = useState([]);
   const [display, setDisplay] = useState(false);

   useEffect(() => {
      db.collection('competitions')
         .get()
         .then((querySnap) => {
            setCompetitions(
               querySnap.docs.map((doc) => ({
                  data: doc.data(),
                  id: doc.id,
               })),
            );
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
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {competitions &&
                     competitions.map((competition) => {
                        const comp = competition.data;
                        return (
                           <tr key={comp.id}>
                              <td data-column="Title">{comp.title}</td>
                              <td data-column="Starts">{comp.starts}</td>
                              <td data-column="Ends">{comp.ends}</td>
                              <td data-column="Participants">
                                 {comp.submissions}
                              </td>
                              <td data-column="Prize">{comp.prize}</td>
                              <td data-column="Votes">
                                 <Link
                                    to={`/admin-panel/update-comp/${competition.id}`}
                                 >
                                    Update
                                 </Link>
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
