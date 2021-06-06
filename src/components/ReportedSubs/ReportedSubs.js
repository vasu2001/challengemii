import React, { useEffect, useState } from 'react';
import './reportedSubs.css';
import img from '../../assets/second.jpg';
import firebase from '../../firebase';

const ReportedSubs = () => {
   const [subs, setSubs] = useState([]);

   console.log(subs);
   return (
      <div className="reported_subs">
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>UserId</th>
                  <th>Email</th>
                  <th>Image</th>
                  <th>Reports</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td data-column="Name">Krishna</td>
                  <td data-column="UserId">123KDFKJEI3421</td>
                  <td data-column="Email">krishnasaxena@gmail.com</td>
                  <td data-column="Image">
                     <img src={img} style={{ width: '150px' }}></img>
                  </td>
                  <td data-column="Reports">
                     <input
                        defaultValue="2"
                        className="vote-update-input"
                     ></input>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default ReportedSubs;
