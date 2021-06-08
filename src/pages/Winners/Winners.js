import React, { useState, useEffect } from 'react';
import './winner.css';
import img from '../../assets/winner-1.jpg';
import WinnerCard from '../../components/WinnerCard/WinnerCard';
import firebase from '../../firebase';
import { motion } from 'framer-motion';
const Winners = () => {
   const [data, setData] = useState();

   useEffect(() => {
      firebase
         .firestore()
         .collection('winners')
         .get()
         .then((querySnapshot) => {
            setData(querySnapshot.docs.map((doc) => doc.data()));
         });
   }, []);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 1 }}
      >
         <div className="winner-pg">
            <div className="winner-cover">
               <img src={img}></img>
            </div>
            <div className="winner-content">
               <h2>
                  Winners in <span style={{ color: 'red' }}>past</span>
               </h2>
               {data &&
                  data.map((data, i) => {
                     return <WinnerCard data={data} key={i} />;
                  })}
            </div>
         </div>
      </motion.div>
   );
};

export default Winners;
