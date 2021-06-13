import React, { useEffect, useState } from 'react';
// import Nav from '../../components/Nav-new/Nav';
import './allCompetitions.css';
import CarouselNew from '../../components/Carousel-New/CarouselNew';
import CardNew from '../../components/Cards-new/CardNew';
import firebase from '../../firebase';
import ongoing from '../../assets/gift-box.png';
import upcoming from '../../assets/check-in.png';
import moment from 'moment';
import { motion } from 'framer-motion';

const db = firebase.firestore();

const AllCompetitions = () => {
   const [competitions, setCompetitions] = useState([]);
   const [filter, setFilter] = useState(0); // 0 - ongoing 1 - upcoming
   const [color, setColor] = useState(0);
   document.title = 'ChallengeMii - Competitions';
   useEffect(() => {
      db.collection('competitions')
         .get()
         .then((querySnap) => {
            setCompetitions(
               querySnap.docs.map((x) => ({ data: x.data(), id: x.id })),
            );
         });
   }, []);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1 }}
      >
         <div className="all-competitions">
            <CarouselNew />
            <div className="all-competitions-content">
               <div className="left-pane">
                  <ul className="left-items">
                     <li
                        onClick={() => {
                           setFilter(0);
                           setColor(0);
                        }}
                        style={{
                           backgroundColor: `${
                              color === 0 ? '#fca311' : '#e5e5e5'
                           }`,
                        }}
                     >
                        <img
                           alt=""
                           src={ongoing}
                           style={{
                              width: '30px',
                              transform: 'translateY(-5px)',
                              marginRight: '5px',
                           }}
                        />
                        Ongoing
                     </li>
                     <li
                        onClick={() => {
                           setFilter(1);
                           setColor(1);
                        }}
                        style={{
                           backgroundColor: `${
                              color === 1 ? '#fca311' : '#e5e5e5'
                           }`,
                        }}
                     >
                        <img
                           alt=""
                           src={upcoming}
                           style={{
                              width: '30px',
                              transform: 'translateY(-5px)',
                              marginRight: '5px',
                           }}
                        />
                        Upcoming
                     </li>
                  </ul>
               </div>
               <div className="right-pane">
                  <div className="right-header">
                     <h2>Competitions</h2>
                     <div className="status">
                        <div className="ongoing" onClick={() => setFilter(0)}>
                           Ongoing
                        </div>
                        <div className="upcoming" onClick={() => setFilter(1)}>
                           Upcoming
                        </div>
                     </div>
                  </div>
                  {/* {competitions &&
                  competitions.map((competition) => {
                     return (
                        <CardNew
                           competition={competition}
                           key={competition.id}
                        />
                     );
                  })} */}
                  {filter === 0
                     ? competitions &&
                       competitions
                          .filter(
                             (competition) =>
                                new Date(competition.data.starts) <
                                   new Date() ===
                                true,
                          )
                          .map((filteredCompetition) => {
                             return (
                                <CardNew
                                   competition={filteredCompetition}
                                   key={filteredCompetition.id}
                                />
                             );
                          })
                     : competitions &&
                       competitions
                          .filter(
                             (competition) =>
                                new Date(competition.data.starts) >
                                   new Date() ===
                                true,
                          )
                          .map((competition) => {
                             return (
                                <CardNew
                                   competition={competition}
                                   key={competition.id}
                                />
                             );
                          })}
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default AllCompetitions;
